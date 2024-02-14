import React from "react";
import { Badge, Box, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { GameSeasonScore } from "./game-season-score";
import { GameSeasonInfo } from "./game-season-info";
import { GameStateType } from "@/data/types";

const steps = [
  {
    label: "Весна",
    description: "Активны А и Б",
  },
  {
    label: "Лето",
    description: "Активны Б и В",
  },
  {
    label: "Осень",
    description: "Активны В и Г",
  },
  {
    label: "Зима",
    description: "Активны А и Г",
  },
];

type GameSeasonsStepperPropsType = {
  gameState: GameStateType;
};

import { countScores } from "@/game-utils/score-counter";

export function GameSeasonsStepper(props: GameSeasonsStepperPropsType) {
  const { season, scores } = props.gameState;

  return (
    <Box>
      <Stepper activeStep={season} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
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
                {step.label}
              </Badge>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack direction={"row"} spacing={2} sx={{ marginTop: 1 }} alignItems={"stretch"}>
        <GameSeasonInfo text={steps[season].description} />

        <GameSeasonScore score={scores[season]} />
      </Stack>
    </Box>
  );
}
