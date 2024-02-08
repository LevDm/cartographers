"use client";
import React from "react";

import { Button, AppBar, Box, Toolbar, IconButton, Typography, Container } from "@mui/material";

import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { usePathname, useRouter } from "next/navigation";

export default function FinishedActionPage() {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    console.log(basepath, path);
    router.push(`${basepath}${path}`);
  };

  console.log();

  return (
    <Box component={"main"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => router.back()}>
            <StarOutlineIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
            Результат
          </Typography>
          <Button color="inherit" onClick={() => router.push("//rules")}>
            Правила
          </Button>
        </Toolbar>
      </AppBar>

      <Container component={"section"}>
        <Button onClick={() => router.replace("//")}>Главная</Button>
      </Container>
    </Box>
  );
}
