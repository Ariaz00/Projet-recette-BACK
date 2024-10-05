function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //token est dans l'en tête authorization

    if (token == null) return res.sendStatus(401); // on renvoie une erreur si il n'y a pas de token

    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if (err) return res.sendStatus(403); // si le token est invalidé ou expiré

        req.user = user;
        next();
    })
}

module.exports = authenticateToken