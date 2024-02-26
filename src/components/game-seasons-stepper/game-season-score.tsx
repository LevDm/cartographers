import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import { SEASONS } from "@/data/elements";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

export const GameSeasonScore = observer(() => {
  const { season, scores, scoresResults } = useStore();

  const curSeason = season.get();

  const score = scores[curSeason];
  const result = scoresResults.get()[curSeason];
  const data = SEASONS[curSeason];

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography>Счёт сезона {data.title}</Typography>
      <Paper sx={{ padding: 1, width: "fit-content" }}>
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {data.score.map((el, index) => (
            <Stack
              key={`score-col-${index}`}
              direction={"column"}
              spacing={1}
              alignItems="stretch"
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <Typography>{el.title}</Typography>
              <Typography>{score[el.value]}</Typography>
            </Stack>
          ))}
          <Typography variant="h5">{result}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
});
