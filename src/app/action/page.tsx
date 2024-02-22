"use client";
import React from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
  Fab,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { CardSelector } from "@/components/card-selector/card-selector";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { MAPS_IMG, START_GAME_CARDS } from "@/data/selectedCards";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Alert } from "@/components/notification/custom-alert";
import { SelectCardType } from "@/data/types";

type FormSelecterNames =
  | "game-frame"
  | "game-start-counter-a"
  | "game-start-counter-b"
  | "game-start-counter-c"
  | "game-start-counter-d"
  | "game-start-skill-1"
  | "game-start-skill-2"
  | "game-start-skill-3";

type FormValues = Record<FormSelecterNames, string>;

const skillSelecterIds = [
  "game-start-skill-1",
  "game-start-skill-2",
  "game-start-skill-3",
] as FormSelecterNames[];

export default function ActionPage() {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "game-frame": "map-a",
      "game-start-counter-a": "",
      "game-start-counter-b": "",
      "game-start-counter-c": "",
      "game-start-counter-d": "",
      "game-start-skill-1": "",
      "game-start-skill-2": "",
      "game-start-skill-3": "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (config: FormValues) => {
    console.log("submit", config);
    enqueueSnackbar({ variant: "success", message: `Запуск игры...` });
    link("/process");
  };

  const onError = (errors: any) => {
    console.log("onError", errors);
    const firstRequired = Object.keys(errors)[0];
    const isCounter = firstRequired.includes("counter");
    const isSkill = firstRequired.includes("skill");
    const msg = (isCounter && "подсчёта очков") || (isSkill && "навыка");

    enqueueSnackbar({ variant: "error", message: `Необходим выбор карты ${msg}` });
  };

  const watchFields = watch(skillSelecterIds);

  const checkSkills = (SelecterId: string, cards: SelectCardType[]) => {
    const selecterValue = watchFields[skillSelecterIds.indexOf(SelecterId as FormSelecterNames)];
    return cards.map((el, index) => ({
      ...el,
      ...(selecterValue != el.id && index > 0 && { disabled: watchFields.includes(el.id) }),
    }));
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

      <Container component={"section"} maxWidth={"xl"} sx={{ marginTop: 3 }}>
        <Stack
          component={"form"}
          onSubmit={handleSubmit(onSubmit, onError)}
          flexDirection={"column"}
          alignItems={"center"}
          spacing={4}
        >
          <Typography>У тебя есть возможность выбрать вариант игровового поля</Typography>
          <CardSelector
            selectID="game-frame"
            title="Игровое поле"
            cards={MAPS_IMG}
            required
            control={control}
            error={Boolean(errors["game-frame"])}
          />

          <Typography>
            Следуя правилам, установи определяющие условия игровые карты - подсчета очков и навыков
          </Typography>
          {START_GAME_CARDS.map((store) => (
            <Box
              key={store.base.id}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {store.data.map((el) => {
                const id = `${store.base.selectID}-${el.id}`;
                return (
                  <CardSelector
                    key={`${store.base.id}-${el.id}`}
                    selectID={id}
                    title={`${store.base.title} ${el.title}`}
                    cards={checkSkills(id, el.cards)}
                    //
                    required
                    control={control}
                    error={Object.keys(errors).includes(`${store.base.selectID}-${el.id}`)}
                  />
                );
              })}
            </Box>
          ))}

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
            <Fab color="primary" variant="extended" type="submit">
              <Typography>Начать</Typography>
              <ChevronRightIcon />
            </Fab>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
