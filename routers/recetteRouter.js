const recetteModel = require('../models/recetteModel')
const recetteRouter = require('express').Router()

recetteRouter.post("/recette", async (req,res)=>{
    try {
        const newRecette = new recetteModel(req.body)
        await newRecette.save()
        res.json(newRecette)
    } catch (error) {
        res.json(error)        
    }
})

recetteRouter.get("/recette", async(req,res)=>{ // récupérer les recettes
    try {
        const recette = await recetteModel.find()
        res.json(recette)
    } catch (error) {
        res.json(error)
    }
})

recetteRouter.get("/recette/title/:title", async(req,res)=>{ // rechercher les recettes par titre
    try {
        const recette = await recetteModel.find({
            title: req.params.title
        })
        res.json(recette)
    } catch (error) {
        res.json(error)
    }
})

recetteRouter.get("/recette/category/:category", async(req,res)=>{ // rechercher les recettes par catégorie
    try {
        const recette = await recetteModel.find({
            category: req.params.category
        })
        res.json(recette)
    } catch (error) {
        res.json(error)
    }
})

recetteRouter.get("/recette/ingredients/:ingredients", async(req,res)=>{ // rechercher les recettes par ingrédients
    try {
        const ingredientsArray = req.params.ingredients.split(",")
        const recette = await recetteModel.find({
            ingredients: {$in: ingredientsArray}
        })
        res.json(recette)
    } catch (error) {
        res.json(error)
    }
})

recetteRouter.get('/recette/:id', async(req,res)=>{ // trouver les détails de la recette
    try {
        const recette = await recetteModel.findOne({_id: req.params.id})
        res.json(recette)
    } catch (error) {
        res.json(error)        
    }
})

recetteRouter.put('/recette/:id', async(req,res)=>{ // mettre à jour la recette
    try {
        await recetteModel.updateOne({_id: req.params.id}, req.body)
        res.json({message: "la recette a été modifiée"})
    } catch (error) {
        res.json(error)
        
    }

})

recetteRouter.delete('/recette/:id', async(req,res)=>{ // delete une recette
    try {
        await recetteModel.deleteOne({_id: req.params.id})
        res.json({message: "la recette a été supprimée"})
    } catch (error) {
        res.json(error)
        
    }

})





module.exports = recetteRouter
