import { Card, CardContent, Skeleton, Box } from "@mui/material";

const RecipeSkeleton = () => {
  return (
    <Card sx={{ width: "100%", p: 2 }}>

      <CardContent>

        {/* Title */}
        <Skeleton variant="text" height={35} width="80%" />

        {/* Description */}
        <Skeleton variant="text" height={20} width="90%" />
        <Skeleton variant="text" height={20} width="70%" />

        {/* Chips */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={70} height={25} />
          <Skeleton variant="rounded" width={70} height={25} />
          <Skeleton variant="rounded" width={90} height={25} />
        </Box>

        {/* Cooking time */}
        <Skeleton variant="text" height={25} width="40%" sx={{ mt: 2 }} />

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Skeleton variant="rectangular" width={120} height={35} />
          <Skeleton variant="rectangular" width={80} height={35} />
        </Box>

      </CardContent>

    </Card>
  );
};

export default RecipeSkeleton;