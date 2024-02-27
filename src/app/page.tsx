"use client";
import React, { useEffect } from "react";

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

import { observer } from "mobx-react-lite";

import ExtensionIcon from "@mui/icons-material/Extension";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/mobx-store/use-store-provider";
import { format } from "date-fns";

const HomePage = observer(() => {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  const { loadSuccses, lastSave } = useStore();

  return (
    <Box component={"main"}>
      <AppBar position="static">
        <Toolbar>
          <ExtensionIcon />
          <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
            Главная
          </Typography>
          <Button
            color="inherit"
            sx={{ fontSize: "1.25rem", textTransform: "none" }}
            onClick={() => router.push("//rules")}
          >
            Правила
          </Button>
        </Toolbar>
      </AppBar>

      <Container component={"section"}>
        <Stack spacing={2}>
          <Button size="large" onClick={() => link("/action")}>
            Новая
          </Button>
          <Button
            size="large"
            onClick={() => link("/action/process")}
            disabled={!(loadSuccses.get() && lastSave.get() != null)}
          >
            {lastSave.get()
              ? `${format(lastSave.get() ?? "", "HH:mm / dd.MM")} - продолжить`
              : "Нет сохранений"}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
});
export default HomePage;
