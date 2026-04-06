const express= require("express")
const router= express.Router()

const {
    addToFavorite,getFavorites,removeFavorite,removeAll
} = require("../controllers/favoriteController")



router.post("/save",addToFavorite)

router.get("/",getFavorites)

router.delete("/delete/:id",removeFavorite)

router.delete("/deleteAll",removeAll)

module.exports = router