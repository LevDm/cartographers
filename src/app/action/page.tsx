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
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { CardSelector } from "@/components/card-selector/card-selector";

import { MAPS_IMG, START_GAME_CARDS } from "@/data/selectedCards";

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
          alignItems={"center"}
          spacing={4}
        >
          <CardSelector
            selectID="game-frame"
            title="Игровое поле"
            cards={MAPS_IMG}
            required
            control={control}
            error={Boolean(errors["game-frame"])}
          />

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
              {store.data.map((el) => (
                <CardSelector
                  key={`${store.base.id}-${el.id}`}
                  selectID={`${store.base.selectID}-${el.id}`}
                  title={`${store.base.title} ${el.title}`}
                  cards={el.cards}
                  //
                  required
                  control={control}
                  error={Object.keys(errors).includes(`${store.base.selectID}-${el.id}`)}
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
