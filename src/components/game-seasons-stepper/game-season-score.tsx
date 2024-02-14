import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { SeasonScoresType } from "@/data/types";

type SeasonScorePropsType = {
  season: number;
  score: SeasonScoresType;
};

import { countScores } from "@/game-utils/score-counter";

import { SEASONS } from "@/data/elements";

export function GameSeasonScore(props: SeasonScorePropsType) {
  const { season, score } = props;
  //const { p1, p2, c, m } = score;

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography>Счёт сезона {SEASONS[season].title}</Typography>
      <Paper sx={{ padding: 1, width: "fit-content" }}>
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {SEASONS[season].score.map((el, index) => (
            <Stack
              key={`score-col-${index}`}
              direction={"column"}
              spacing={1}
              alignItems="stretch"
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <Typography>{el.title}</Typography>
              <Typography>{Object.values(score)[index]}</Typography>
            </Stack>
          ))}
          <Typography variant="h5">{countScores(score)}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
