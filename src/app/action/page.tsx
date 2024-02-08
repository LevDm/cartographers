"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Stack,
  Grid,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FieldError, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import CardSelector, { CardType } from "@/components/card-selector/card-selector";

import cagIMG_1 from "../../../public/counting-cads/1_01.jpg";
import cagIMG_2 from "../../../public/counting-cads/1_02.jpg";
import cagIMG_3 from "../../../public/counting-cads/1_03.jpg";

const cards: CardType[] = [
  {
    value: "",
    src: cagIMG_1,
    disabled: true,
  },
  {
    value: "1",
    src: cagIMG_2,
  },
  {
    value: "2",
    src: cagIMG_3,
  },
];

const COUNTERS = {
  base: {
    id: "counter",
    title: "Счетчик",
    selectID: "game-start-counter",
  },
  data: [
    { id: "a", title: "А", cards: cards },
    { id: "b", title: "Б", cards: cards },
    { id: "c", title: "В", cards: cards },
    { id: "d", title: "Г", cards: cards },
  ],
};

const SCILLS = {
  base: {
    id: "skill",
    title: "Навык",
    selectID: "game-start-skill",
  },
  data: [
    { id: "1", title: "1", cards: cards },
    { id: "2", title: "2", cards: cards },
    { id: "3", title: "3", cards: cards },
  ],
};

export default function ActionPage() {
  const router = useRouter();
  const basepath = usePathname();

  const link = (path: string) => {
    router.push(`${basepath}${path}`);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "game-frame": "1",
      "game-start-counter-a": "",
      "game-start-counter-b": "",
      "game-start-counter-c": "",
      "game-start-counter-d": "",
      "game-start-skill-1": "",
      "game-start-skill-2": "",
      "game-start-skill-3": "",
    },
  });

  const submit = (data: any) => {
    console.log("submit", data);
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

      <Container component={"section"} maxWidth={"xl"}>
        <Button onClick={() => link("/process")}>Начать</Button>
        <Stack
          component={"form"}
          onSubmit={handleSubmit(submit)}
          flexDirection={"column"}
          sx={{
            alignItems: "center",
            gap: 4,
          }}
        >
          <CardSelector
            selectID="game-frame"
            title="Игровое поле"
            cards={cards}
            required
            control={control}
            error={Boolean(errors["game-frame"])}
          />

          {[COUNTERS, SCILLS].map((sel) => (
            <Box key={sel.base.id}>
              {sel.data.map((el) => (
                <CardSelector
                  key={`${sel.base.id}-${el.id}`}
                  selectID={`${sel.base.selectID}-${el.id}`}
                  title={`${sel.base.title} ${el.title}`}
                  cards={el.cards}
                  //
                  required
                  control={control}
                  error={Object.keys(errors).includes(`${sel.base.selectID}-${el.id}`)}
                />
              ))}
            </Box>
          ))}

          <Button type="submit">ok</Button>
        </Stack>
      </Container>
    </Box>
  );
}
