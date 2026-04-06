const express = require("express");
const cors = require("cors");
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(cors())
app.use(express.json());
// const authRoutes= require("./routes/authRoutes")
const recipeRoutes=require("./routes/recipeRoutes")
const favoriteRoutes=require("./routes/favoriteRoutes")



app.get("/", (req, res) => {
  res.send("AI Recipe API Running");
});

// app.use("/api/auth",authRoutes)
app.use("/api/recipes",recipeRoutes)
app.use("/api/favorites",favoriteRoutes)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});