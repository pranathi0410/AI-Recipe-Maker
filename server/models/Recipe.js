const mongoose=require("mongoose")

const recipeSchema=new mongoose.Schema({
    recipeName:{
        type:String,
        required:true
    },
    ingredients:[{
         type:String,
         required:true,
         lowercase:true
    }],
    steps:[{
        type:String,
}], 
createdByAI:{
    type:Boolean,
    default:false,
    required:true
},

},{timestamps:true,
    collection:"recipes"
})

module.exports= mongoose.model("Recipe",recipeSchema)
