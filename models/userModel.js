const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, "le pseudo est requis"]
    },
    password: {
        type: String,
        required: [true, "le mot de passe est requis"]
    },
    mail: {
        type: String,
        required: [true, "le mail est requis"],
        unique: true // on s'assure que le mail est unique
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel