import React, { ElementType } from "react";
import { Box, Divider, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { SEASONS } from "@/data/elements";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";
import { isUndefined } from "lodash";
import { SeasonScoresType } from "@/data/types";

export const GameSeasonScore = observer(() => {
  const { season, scores, scoresResults } = useStore();
  const curSeason = season.get();

  const score = scores[curSeason];
  const result = scoresResults.get()[curSeason];

  return <SeasonScore season={curSeason} score={score} result={result} />;
});

type SeasonScorePropsType = {
  season: number;
  score: SeasonScoresType;
  result: number;
};
export const SeasonScore = (props: SeasonScorePropsType) => {
  const { season, score, result } = props;

  const data = SEASONS[season];

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography>Счёт сезона {data.title}</Typography>
      <Paper sx={{ padding: 1, width: "fit-content" }}>
        <Stack
          direction={"row"}
          alignItems="flex-end"
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
              {!isUndefined(el.color) && (
                <Typography
                  sx={{
                    padding: 1,
                    borderRadius: 1,
                    border: `2px solid ${el.color}`,
                  }}
                >
                  {el.title}
                </Typography>
              )}
              {!isUndefined(el.img) && (
                <SvgIcon
                  component={el.img.src as ElementType}
                  htmlColor={el.img.bgc}
                  sx={{ height: "28px", width: "28px" }}
                />
              )}
              <Typography sx={{ textAlign: "center" }}>{score[el.value]}</Typography>
            </Stack>
          ))}
          <Stack direction={"row"} alignItems={"center"} alignSelf={"center"}>
            <StarIcon htmlColor={"#D29947"} />
            <Typography variant="h5">{result}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
