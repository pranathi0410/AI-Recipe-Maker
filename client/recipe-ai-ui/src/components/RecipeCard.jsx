import { Card, CardContent, Typography, Chip, Button, Box } from "@mui/material"
import { useState } from "react";

const RecipeCard = ({ recipe, onView, onSave, onDelete }) => {
    const [saved, setSaved] = useState(false)



    const handleSaveClick = async () => {
        const success = await onSave(recipe); // wait for backend
        if (success) {
            setSaved(true);
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <CardContent>
                <Typography variant="h8" fontWeight="bold">
                    {recipe.title}
                </Typography>

                <Typography sx={{
                    mt: 1, color: "gray",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                }}>
                    {recipe.description}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>

                    <Chip label={recipe.difficulty} size="small" />
                    <Chip label={recipe.diet} size="small" />
                </Box>
                <Typography sx={{ mt: 2 }}>
                    ⏱ {recipe.cookingTime} min
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    {onView && (
                        <Button variant="outlined" size="small" onClick={() => onView(recipe)}>
                            View Recipe
                        </Button>
                    )}

                    {onSave && (
                        <Button variant="contained" size="small" onClick={handleSaveClick} disabled={saved}>
                            {!saved? "save": "saved"}
                        </Button>
                        
                    )}

                    {onDelete && (
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => onDelete(recipe._id)}
                        >
                            Remove
                        </Button>
                    )}
                </Box>

            </CardContent>
        </Card>
    )
}

export default RecipeCard;