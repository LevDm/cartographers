import React from "react";
import { Badge, Box, Stack, Step, StepLabel, Stepper } from "@mui/material";

import { GameSeasonScore } from "./game-season-score";
import { GameSeasonInfo } from "./game-season-info";

import { SEASONS } from "@/data/elements";

import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

export const GameSeasonsStepper = observer(() => {
  const { season, scoresResults } = useStore();

  return (
    <Box>
      <Stepper activeStep={season.get()} alternativeLabel>
        {SEASONS.map((step, index) => (
          <Step key={`${step.title}-${index}`}>
            <StepLabel>
              <Badge
                badgeContent={season.get() > index ? scoresResults.get()[index] : 0}
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
        <GameSeasonInfo text={SEASONS[season.get()].description} />

        <GameSeasonScore />
      </Stack>
    </Box>
  );
});
