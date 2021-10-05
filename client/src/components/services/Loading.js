import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, CircularProgress, Container } from "@mui/material";
import BackgroundImage from "./bg1.png";

const Loading = () => {
  return (
    <Container
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        maxWidth: "100%",
        minHeight: "60vh",
        paddingBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size='5rem' />
        <Typography sx={{ marginTop: "2rem", fontSize: "1.5rem" }}>
          Loading data from server...
        </Typography>
      </Box>
    </Container>
  );
};

export default Loading;
