import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import { Board } from "./board";

export function GameBoard() {
  return (
    <Box sx={{ paddingTop: 1, marginTop: 2 }}>
      <Typography paddingRight={1}>Карта</Typography>
      <Paper
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          display: "flex",
          backgroundColor: "brown",
          border: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Board />
      </Paper>
    </Box>
  );
}
