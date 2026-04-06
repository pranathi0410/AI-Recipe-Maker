import {useState} from "react";

const useRecipeModal=()=>{
    const [selectedRecipe,setSelectedRecipe]= useState(null);
    const [open,setOpen] = useState(false);

    const handleView=(recipe)=>{
        setSelectedRecipe(recipe)
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false);
    }

    return {
        selectedRecipe,open,handleView,handleClose
    }
}

export default useRecipeModal;