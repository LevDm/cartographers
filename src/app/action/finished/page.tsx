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
  Fab,
  Stack,
  Paper,
  Badge,
} from "@mui/material";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import { useRouter } from "next/navigation";
import { useStore } from "@/mobx-store/use-store-provider";
import { observer } from "mobx-react-lite";
import { GameActionHistory } from "@/components";
import { SeasonScore } from "@/components/game-seasons-stepper/game-season-score";

const FinishedActionPage = observer(() => {
  const router = useRouter();

  const { scores, scoresResults } = useStore();

  const final = scoresResults.get().reduce((acc, res) => acc + res, 0);
  const addFinal = scores.reduce((acc, score) => acc + score.m, 0);

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
          <Button
            color="inherit"
            sx={{ fontSize: "1.25rem", textTransform: "none" }}
            onClick={() => router.push("//rules")}
          >
            Правила
          </Button>
        </Toolbar>
      </AppBar>

      <Container component={"section"} sx={{ paddingTop: 2 }}>
        <Stack direction={"column"} alignItems={"center"}>
          <Box
            sx={{
              position: "relative",
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <StarIcon
              htmlColor={"#D29947"}
              sx={{
                height: "100%",
                width: "100%",
                //aspectRatio: "1/1",
                position: "absolute",
                zIndex: 1,
                top: "0%",
                left: "0%",
              }}
            />
            <Badge badgeContent={addFinal} color="info" showZero>
              <Typography variant="h4" sx={{ zIndex: 1, paddingRight: 1 }}>
                {final}
              </Typography>
            </Badge>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {scoresResults.get().map((res, season) => (
              <SeasonScore
                key={`season-score-${season}`}
                season={season}
                score={scores[season]}
                result={res}
              />
            ))}
          </Box>
        </Stack>

        <GameActionHistory />

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
          <Fab variant="extended" color="primary" onClick={() => router.replace("//")}>
            <Typography>На главную</Typography>
          </Fab>
        </Box>
      </Container>
    </Box>
  );
});
export default FinishedActionPage;
