import React from "react";
import { Badge, Box, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { GameSeasonScore } from "./game-season-score";
import { GameSeasonInfo } from "./game-season-info";
import { GameStateType } from "@/data/types";

import { SEASONS } from "@/data/elements";

type GameSeasonsStepperPropsType = {
  gameState: GameStateType;
};

import { countScores } from "@/game-utils/score-counter";

export function GameSeasonsStepper(props: GameSeasonsStepperPropsType) {
  const { season, scores } = props.gameState;

  return (
    <Box>
      <Stepper activeStep={season} alternativeLabel>
        {SEASONS.map((step, index) => (
          <Step key={`${step.title}-${index}`}>
            <StepLabel>
              <Badge
                badgeContent={season > index ? countScores(scores[index]) : 0}
                color="secondary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  paddingRight: 1.5,
                }}
              >
                {step.title}
              </Badge>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack direction={"row"} spacing={2} sx={{ marginTop: 2 }} alignItems={"stretch"}>
        <GameSeasonInfo text={SEASONS[season].description} />

        <GameSeasonScore season={season} score={scores[season]} />
      </Stack>
    </Box>
  );
}
