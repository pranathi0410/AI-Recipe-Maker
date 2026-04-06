import { Container, Typography, Box, Button } from "@mui/material";
import IngredientInput from "../components/IngredientInput";
import { useState } from "react";
import { Grid } from "@mui/material"
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../modal/RecipeModal"
import RecipeSkeleton from "../components/RecipeSkeleton";
import { useNavigate } from "react-router-dom";
import useRecipeModal from "../hooks/useRecipeModal";

const Home = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedRecipe,open,handleView,handleClose} = useRecipeModal();
   
    const navigate = useNavigate();

    const generateRecipes = async () => {
        console.log("inside func")
        setLoading(true)
        console.log(loading)
        try {
            const response = await fetch("http://localhost:5000/api/recipes/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        ingredients
                    })
                }
            )
            const data = await response.json();
            console.log(data)
            setRecipes(data)

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }

    const saveRecipe = async (recipe) => {
        try {
            const response = await fetch("http://localhost:5000/api/favorites/save", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(recipe)
            })
            
            const data = await response.json();
            if (!response.ok) {
                console.error(data.message);
                return false;
            }
            else {
                alert("Recipe saved successfully!");
                return true;
            }

        } catch (error) {
            console.log("error saving message", error);
            return false;
        }

    }

    const handleSaveRecipe = (recipe) => {
        return saveRecipe(recipe);
    }

    
    return (
        <Container maxWidth="lg">

            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h4" fontWeight="bold">
                    AI Recipe Generator
                </Typography>

                <Typography sx={{ mt: 2, color: "gray" }}>
                    Add ingredients and click Generate Recipes
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/favorites")}>
                    Favorites ❤️
                </Button>
            </Box>

            <IngredientInput ingredients={ingredients}
                setIngredients={setIngredients}
            />

            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button variant="contained"
                    size="large"
                    onClick={generateRecipes}
                    disabled={ingredients.length === 0}
                >
                    Generate Recipes
                </Button>
            </Box>
            {/* Spinner */}


            {(loading || recipes.length > 0) && (
                <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
                    {loading
                        ? Array.from(new Array(6)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <RecipeSkeleton />
                            </Grid>
                        ))
                        : recipes.map((recipe, index) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index} sx={{ display: "flex" }}>
                                <RecipeCard recipe={recipe} onView={handleView} onSave={handleSaveRecipe}  />
                            </Grid>
                        ))}
                </Grid>
            )}

            <RecipeModal
                open={open}
                recipe={selectedRecipe}
                onClose={handleClose}
            />


        </Container>
    );
};

export default Home;