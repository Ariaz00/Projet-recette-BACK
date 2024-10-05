const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const authenticateToken = require('../middleware');
const userModel = require('../models/userModel');
const userRouter = require('express').Router();

const SECRET_KEY = 'supersecretkey'; // clé secrète pour signer les tokens

userRouter.post("/user", async (req,res)=>{ // enregistrer un user
    try {
        // Pour hasher le mdp
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new userModel({
            pseudo: req.body.pseudo,
            mail: req.body.mail,
            password: hashedPassword,
        });

        await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.json(error)
    }
})

userRouter.get("/protected", authenticateToken, async(req,res)=>{ // récupère les users
    try {
        const user = await userModel.find()
        res.json(user)
    } catch (error) {
        res.json(error)
        
    }
})

// Route pour le login

userRouter.post("/login", async(req,res)=>{
    try { // on tourve l'user par mail
        const user = await userModel.findOne({mail:req.body.mail});
        if(!user){
            return res.status(400).json({message: "Utilisateur non trouvé"});
        }
        // On compare le mdp
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "Mot de passe incorrect"});
        }
        // on génère un token JWT
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({message: "Connexion réussie", token});
    } catch (error) {
        res.json(error)
    }
})

module.exports = userRouter