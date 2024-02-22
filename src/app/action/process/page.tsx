"use client";
import React, { useState } from "react";

import { Box, Container } from "@mui/material";

import { CoinWallet, GameActionHistory, GameBoard, GameSeasonsStepper } from "@/components";

import { useRouter } from "next/navigation";

import { AllActionTypes } from "@/data/types";

import { ActionBar } from "@/components/game-action-bar/action-bar";
import { TopAppBar } from "@/components/game-top-bar/game-top-bar";
import { InputHandlerType, OpenInputStepType } from "@/components/game-board/types";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";
import { actionBarHandlerType } from "@/components/game-action-bar/types";

const ProcessActionPage = observer(() => {
  const router = useRouter();

  const { switchToNewSeason, stepHandler } = useStore();

  const [openInputStep, setOpenInputStep] = useState<OpenInputStepType>(null);

  const inputClose = () => {
    setOpenInputStep(null);
  };

  const finishGame = () => {
    router.replace("finished");
  };

  const actionBarHandler = (e: actionBarHandlerType) => {
    const { action, value } = e;

    switch (action) {
      case "simpl":
        setOpenInputStep(e);
        return;
      case "skill":
        setOpenInputStep(e);
        return;
      case "season":
        if (value == "finish") finishGame();
        else switchToNewSeason();
        return;
    }
  };

  const inputHandler: InputHandlerType = (newMapFrames, coins = 0, ruin = false) => {
    try {
      stepHandler({
        stepMode: openInputStep?.action as AllActionTypes,
        stepValue: openInputStep?.value ?? "",
        newMapFrames: newMapFrames,
        ruin: ruin,
        coins: coins,
      });
    } catch (e) {
      console.error(e);
    } finally {
      inputClose();
    }
  };

  return (
    <Box component={"main"}>
      <TopAppBar router={router} />

      <Container component={"section"} sx={{ marginTop: 3 }}>
        <GameSeasonsStepper />
        <CoinWallet />
        <GameBoard
          openInputStep={openInputStep}
          inputHandler={inputHandler}
          inputClose={inputClose}
        />
        <GameActionHistory />
      </Container>

      <ActionBar actionBarHandler={actionBarHandler} />
    </Box>
  );
});
export default ProcessActionPage;
