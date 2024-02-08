"use client";
import React from "react";

import { Button, AppBar, Box, Toolbar, IconButton, Typography, Container } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { usePathname, useRouter } from "next/navigation";

export default function ActionPage() {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  return (
    <Box component={"main"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => router.back()}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
            Параметры
          </Typography>

          <Button color="inherit" onClick={() => router.push("//rules")}>
            Правила
          </Button>
        </Toolbar>
      </AppBar>

      <Container component={"section"}>
        <Button onClick={() => link("/process")}>Начать</Button>
      </Container>
    </Box>
  );
}
