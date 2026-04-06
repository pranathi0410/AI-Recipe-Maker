const Favorite=require("../models/Favorite")

exports.addToFavorite=async(req,res)=>{
try{
    const existing= await Favorite.findOne({title:req.body.title })
    if(existing){
        return res.status(400).json({message:"Already added to favorites"})
    }
    const favorite= new Favorite(
        req.body
    )
    await favorite.save()
    res.status(200).json({message:"added to favorites"})
}catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
}
}

exports.removeFavorite = async(req,res)=>{
    console.log(req.params.id)
    try{
        await Favorite.findByIdAndDelete(req.params.id)
        res.json({message:"removed from favorites"})
    }catch(error){
    res.status(500).json({message:"server error"})
}
}

exports.removeAll=async(req,res)=>{
    try{
    const result= await Favorite.deleteMany({}) 
    res.status(200).json({message:"deleted all"})
}catch(error){
   res.status(500).json({message:"server error"})
}

}

exports.getFavorites=async(req,res)=>{
    try{
       const favorites= await Favorite.find().sort({createdAt:-1})
        res.status(200).json(favorites)
    }catch(error){
    res.status(500).json({message:"server error"})
}
}


