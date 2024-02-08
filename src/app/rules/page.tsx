"use client";
import React from "react";

import { AppBar, Box, Toolbar, IconButton, Typography, Container } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useRouter } from "next/navigation";

export default function RulesPage() {
  const router = useRouter();

  return (
    <Box component={"main"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => router.back()}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
            Правила
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component={"section"}></Container>
    </Box>
  );
}
