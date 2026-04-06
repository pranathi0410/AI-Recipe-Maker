// checking recipe from BE.(no ai call yet)
const Recipe = require("../models/Recipe")
const { generateAIRecipes } = require("../services/aiService")



exports.generateRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "Ingredients required" });
    }
    const userIngredients = ingredients.map(i => i.toLowerCase());

    // 1️⃣ Call AI service
    const aiRecipes = await generateAIRecipes(userIngredients);
    console.log("recipe controller")
    console.log(aiRecipes)
    res.json(aiRecipes)

  } catch (error) {
    console.error("Generate recipe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) {
            return res.status(404).json({ message: "recipe not found" })
        }
        res.json(recipe)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}


exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        if (recipes.length === 0) {
           return res.status(400).json({ message: "empty" })
        }

        return res.json(recipes)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}