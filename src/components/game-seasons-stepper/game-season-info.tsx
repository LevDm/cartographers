import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import { CardsViewModal } from "./info-counters-modal";

export function GameSeasonInfo(props: { text: string }) {
  const { text } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingTop: 1 }}>
      <Typography>Приказы игры</Typography>
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Typography>{text}</Typography>
        <CardsViewModal />
      </Paper>
    </Box>
  );
}
