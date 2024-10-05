const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const recetteRouter = require('./routers/recetteRouter')
const userRouter = require('./routers/userRouter')
const app = express()
app.use(cors());

app.use(express.json())
app.use(recetteRouter);
app.use(userRouter);

app.listen(3000,(err) =>{

    if(err) {
        console.log(err)
    }
    else {
        console.log("Connecté sur le port 3000")
    }
})

app.get('/register', (req,res)=>{
    try {
        res.json({message:"Hello World"})
    } catch (err) {
        res.json(err)
    }
    })
    

mongoose.connect('mongodb://127.0.0.1:27017/recette')
