"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Fab,
} from "@mui/material";

import { CoinWallet, GameActionHistory, GameBoard, GameSeasonsStepper } from "@/components";

import ReplayIcon from "@mui/icons-material/Replay";

import { useRouter } from "next/navigation";

export default function ProcessActionPage() {
  const router = useRouter();

  return (
    <Box component={"main"}>
      <TopAppBar />

      <Container component={"section"}>
        <Button onClick={() => router.replace("finished")}>Конец</Button>

        <GameSeasonsStepper />

        <CoinWallet />

        <GameBoard />

        <GameActionHistory />
      </Container>

      <ActionBar />
    </Box>
  );
}

function TopAppBar() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={() => router.back()}>
          <ReplayIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
          Игра
        </Typography>
        <Button color="inherit" onClick={() => router.push("//rules")}>
          Правила
        </Button>
      </Toolbar>
    </AppBar>
  );
}

import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";

function ActionBar() {
  return (
    <Box
      sx={{
        marginTop: 3,
        paddingBottom: 1,
        zIndex: 1000,
        position: "sticky",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        "& > :not(style)": { m: 1 },
      }}
    >
      <Fab variant="extended" size="medium">
        <AddIcon sx={{ mr: 1 }} />
        Навык
      </Fab>
      <Fab color="primary" variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        Ход
      </Fab>
      <Fab variant="extended" size="medium">
        <NavigationIcon sx={{ mr: 1 }} />
        Сезон
      </Fab>
    </Box>
  );
}
