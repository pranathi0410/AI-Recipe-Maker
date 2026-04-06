const express=require("express");
const router=express.Router();

const {generateRecipes,getRecipeById,getAllRecipes} = require("../controllers/recipeController")

router.post("/generate",generateRecipes)
// router.post("/aigenerate",generateUserAIRecipes)

// router.get("/getAllRecipes",getAllRecipes)
// router.get("/:id",getRecipeById)


module.exports= router;