"use client";
import React from "react";

import { Button, AppBar, Box, Toolbar, IconButton, Typography, Container } from "@mui/material";

import ReplayIcon from "@mui/icons-material/Replay";

import { useRouter } from "next/navigation";

export default function ProcessActionPage() {
  const router = useRouter();

  return (
    <Box component={"main"}>
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

      <Container component={"section"}>
        <Button onClick={() => router.replace("finished")}>Конец</Button>
      </Container>
    </Box>
  );
}
