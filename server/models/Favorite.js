const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    // recipeId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Recipe",
    //     required:true
    // }
    title: {
        type: String,
        required: true
    },
    description: String,
    difficulty: String,
    diet: String,
    cookingTime: String,
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    tips: [String]
}, { timestamps: true })

module.exports = mongoose.model("Favorite", favoriteSchema)