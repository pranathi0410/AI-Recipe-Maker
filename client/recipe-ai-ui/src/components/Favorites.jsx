import { useEffect, useState } from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import RecipeCard from "./RecipeCard";
import useRecipeModal from "../hooks/useRecipeModal";
import RecipeModal from "../modal/RecipeModal";
import { useNavigate } from "react-router-dom";


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate= useNavigate();
  const {
    selectedRecipe,
    open,
    handleView,
    handleClose
  } = useRecipeModal();

  const fetchFavorites = async () => {
    const res = await fetch("http://localhost:5000/api/favorites");
    const data = await res.json();
    console.log(data)
    setFavorites(data);
  };

  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:5000/api/favorites/delete/${id}`, {
      method: "DELETE"
    });
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4 }}>
        Favorites ❤️
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Homepage 
                </Button>
            </Box>

      {favorites.length === 0 ? (
        <Typography sx={{ mt: 3 }}>
          No favorites yet. Save some recipes!
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {favorites.map((recipe) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={recipe._id}>
              <RecipeCard recipe={recipe} onView={handleView} onDelete={()=>{deleteRecipe(recipe._id)}} />
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

export default Favorites;