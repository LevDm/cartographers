"use client";
import React from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  Container,
  Paper,
  Divider,
} from "@mui/material";

import CoverBG from "../../public/cover.jpg";
import Image from "next/image";

import ExtensionIcon from "@mui/icons-material/Extension";

import { usePathname, useRouter } from "next/navigation";

import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store";

import { format } from "date-fns";

import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Alert } from "@/components";

const HomePage = observer(() => {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  const { loadSuccses, lastSave } = useStore();

  const oldRun = () => {
    enqueueSnackbar({ variant: "success", message: `Запуск игры...` });

    link("/action/process");
  };

  return (
    <Box component={"main"}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        Components={{
          error: Alert,
          success: Alert,
        }}
      />
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

      <Image
        src={CoverBG}
        alt=""
        style={{
          marginTop: "56px",
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
          opacity: 0.9,
          maxHeight: "92dvh",
        }}
        objectFit="cover"
        fill={true}
        placeholder="blur"
      />

      <Container
        component={"section"}
        sx={{
          height: "92dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 5,
            paddingTop: 3,
            backgroundColor: "rgba(255,255,255,0.76)",
            backdropFilter: "blur(5px)",
            borderRadius: 4,
          }}
        >
          <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h5" fontWeight={"bold"}>
              Запуск
            </Typography>
            <Divider orientation="horizontal" flexItem />

            <Button
              size="large"
              sx={{ textTransform: "none", width: "100%" }}
              onClick={() => link("/action")}
            >
              Новый
            </Button>
            <Button
              size="large"
              sx={{ textTransform: "none" }}
              onClick={oldRun}
              disabled={!(loadSuccses.get() && lastSave.get() != null)}
            >
              {lastSave.get()
                ? `${format(lastSave.get() ?? "", "HH:mm / dd.MM")} - продолжить`
                : "Нет сохранений"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
});
export default HomePage;
