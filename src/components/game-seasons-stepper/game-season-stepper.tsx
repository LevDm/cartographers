import React from "react";
import { Badge, Box, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { GameSeasonScore } from "./game-season-score";
import { GameSeasonInfo } from "./game-season-info";

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

export function GameSeasonsStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Badge
                badgeContent={activeStep > index ? -50 : 0}
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
        <GameSeasonInfo text={steps[activeStep].description} />

        <GameSeasonScore />
      </Stack>
    </Box>
  );
}
