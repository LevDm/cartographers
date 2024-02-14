import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { SeasonScoresType } from "@/data/types";

type SeasonScorePropsType = {
  score: SeasonScoresType;
};

import { countScores } from "@/game-utils/score-counter";

export function GameSeasonScore(props: SeasonScorePropsType) {
  const { score } = props;
  const { p1, p2, c, m } = score;

  const res = [
    { title: "A", value: p1 },
    { title: "B", value: p2 },
    { title: "C", value: c },
    { title: "D", value: m },
    { value: countScores(score) },
  ];

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography>Счёт сезона</Typography>
      <Paper sx={{ padding: 1, width: "fit-content" }}>
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {res.map((el) => (
            <>
              {(el.title && (
                <Stack
                  direction={"column"}
                  spacing={1}
                  alignItems="stretch"
                  divider={<Divider orientation="horizontal" flexItem />}
                >
                  <Typography>{el.title}</Typography>
                  <Typography>{el.value}</Typography>
                </Stack>
              )) || <Typography variant="h4">{el.value}</Typography>}
            </>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
