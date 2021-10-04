import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loader;
