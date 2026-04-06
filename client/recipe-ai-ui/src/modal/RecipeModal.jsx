import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  Chip,
  Stack,
  Divider,
  Box
} from "@mui/material";

const RecipeModal = ({ open, onClose, recipe }) => {
  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      {/* Title */}
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: 26
        }}
      >
        {recipe.title}
      </DialogTitle>

      <DialogContent>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 16,
            color: "text.secondary",
            mb: 2
          }}
        >
          {recipe.description}
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={recipe.difficulty} />
          <Chip label={recipe.diet} />
        </Stack>

        {/* Cooking Time */}
        <Typography
          sx={{
            fontWeight: 500,
            mb: 3
          }}
        >
          ⏱ {recipe.cookingTime} minutes
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Ingredients */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1
          }}
        >
          Ingredients
        </Typography>

        <List dense>
          {recipe.ingredients.map((item, index) => (
            <ListItem key={index}>
              • {item}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Steps */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1
          }}
        >
          Steps
        </Typography>

        <List>
          {recipe.steps.map((step, index) => (
            <ListItem key={index}>
              <Typography>
                <b>{index + 1}.</b> {step}
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1
              }}
            >
              Cooking Tips
            </Typography>

            <List dense>
              {recipe.tips.map((tip, index) => (
                <ListItem key={index}>
                  💡 {tip}
                </ListItem>
              ))}
            </List>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;