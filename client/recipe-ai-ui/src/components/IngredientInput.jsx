import { useState } from "react";

import {Box, TextField, Chip,Button} from "@mui/material"

const IngredientInput =({ingredients,setIngredients})=>{
    const [input,setInput] = useState("");
    const addingredient =()=>{
        if(!input.trim()) return;
        setIngredients([...ingredients,input.trim()])
        setInput("")
    }
    const removeIngredient=(item)=>{
        setIngredients(ingredients.filter((ing)=> ing !== item))
    }

    return (
        <Box sx={{mt:4}}>
            <Box sx={{display:"flex",gap:2}}>
                <TextField label="Add ingredient"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                fullWidth
                />
            <Button variant="contained" onClick={addingredient} disabled={!input.trim()}>
                Add
            </Button>
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {ingredients.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => removeIngredient(item)}
          />
        ))}
      </Box>
        </Box>
    )
}

export default IngredientInput;