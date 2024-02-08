"use client";
import React from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Container,
} from "@mui/material";

import ExtensionIcon from "@mui/icons-material/Extension";

import { usePathname, useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  return (
    <Box component={"main"}>
      <AppBar position="static">
        <Toolbar>
          <ExtensionIcon />
          <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
            Главная
          </Typography>
          <Button color="inherit" onClick={() => router.push("//rules")}>
            Правила
          </Button>
        </Toolbar>
      </AppBar>

      <Container component={"section"}>
        <Stack spacing={2}>
          <Button size="large" onClick={() => link("/action")}>
            Новая
          </Button>
          <Button size="large" onClick={() => link("/action/process")}>
            Продолжить
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
