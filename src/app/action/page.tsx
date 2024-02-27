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
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";

import { SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { CardSelector } from "@/components/card-selector/card-selector";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { MAPS_IMG, START_GAME_CARDS } from "@/data/selectedCards";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Alert } from "@/components/notification/custom-alert";
import { GameConfig, SelectCardType } from "@/data/types";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";
import { CARD_COUNTER, CARD_SKILL } from "@/data/cards";
import { random } from "lodash";

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

const skillSelecterIds: FormSelecterNames[] = [
  "game-start-skill-1",
  "game-start-skill-2",
  "game-start-skill-3",
];

const counterSelecterIds: FormSelecterNames[] = [
  "game-start-counter-a",
  "game-start-counter-b",
  "game-start-counter-c",
  "game-start-counter-d",
];

const ActionPage = observer(() => {
  const router = useRouter();
  const basepath = usePathname();

  const { startGame } = useStore();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
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

  const getRandArray = (size: number, low: number, max: number) => {
    const res: number[] = [];
    if (low > max || max - (low == 0 ? low - 1 : low) < size) return res;

    while (res.length < size) {
      const num = random(low, max);
      if (!res.includes(num)) res.push(num);
    }
    return res;
  };

  const randomFill = () => {
    const rMap = ["map-a", "map-b"][random(0, 1)];

    const aCounter = CARD_COUNTER.green.map((el) => el.id)[random(0, 3)];

    const bCounter = CARD_COUNTER.blue.map((el) => el.id)[random(0, 3)];

    const cCounter = CARD_COUNTER.red.map((el) => el.id)[random(0, 3)];

    const dCounter = CARD_COUNTER.violet.map((el) => el.id)[random(0, 3)];

    const skills = CARD_SKILL.map((el) => el.id);
    const [rSkill_1, rSkill_2, rSkill_3] = getRandArray(3, 0, 7).map((index) => skills[index]);

    setValue("game-frame", rMap);
    setValue("game-start-counter-a", aCounter);
    setValue("game-start-counter-b", bCounter);
    setValue("game-start-counter-c", cCounter);
    setValue("game-start-counter-d", dCounter);
    setValue("game-start-skill-1", rSkill_1);
    setValue("game-start-skill-2", rSkill_2);
    setValue("game-start-skill-3", rSkill_3);
  };

  const onSubmit: SubmitHandler<FormValues> = (config: FormValues) => {
    enqueueSnackbar({ variant: "success", message: `Запуск игры...` });

    const gameConfig: GameConfig = {
      MapId: config["game-frame"],
      countersIds: counterSelecterIds.map((id) => config[id]),
      skillsIds: skillSelecterIds.map((id) => config[id]),
    };

    startGame(gameConfig);

    link("/process");
  };

  const onError = (errors: any) => {
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

          <Button
            color="inherit"
            sx={{ fontSize: "1.25rem", textTransform: "none" }}
            onClick={() => router.push("//rules")}
          >
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
            <Fab variant="extended" onClick={randomFill}>
              <CasinoOutlinedIcon />
              <Typography ml={1}>Заполнить</Typography>
            </Fab>
            <Fab color="primary" variant="extended" type="submit">
              <Typography>Начать</Typography>
              <ChevronRightIcon />
            </Fab>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
});
export default ActionPage;
