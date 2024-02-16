"use client";
import React, { useState } from "react";

import { Box, Container } from "@mui/material";

import { CoinWallet, GameActionHistory, GameBoard, GameSeasonsStepper } from "@/components";

import { useRouter } from "next/navigation";

import {
  CoinWalletType,
  GameStateType,
  AllActionTypes,
  MapFramesType,
  HistoryRowType,
  CoinTypes,
} from "@/data/types";

import { CARD_SKILL, MAPS } from "@/data/cards";
import { getCurrentDateTime } from "@/game-utils/get-current-date-time";
import { mapFramesCompare } from "@/game-utils/map-compare";
import { ActionBar } from "@/components/game-action-bar/action-bar";
import { TopAppBar } from "@/components/game-top-bar/game-top-bar";

const GameStateDefault = {
  season: 0,
  scores: [...Array(4)].map(() => ({ p1: 0, p2: 0, c: 0, m: 0 })),
  freeSkills: 1,
};

const CoinWalletDefault = [...Array(14)].map((_, index) => ({
  id: `coin-${index}`,
  coinType: "none" as CoinTypes,
}));

const MapDefault = [...Array(121)].map((_, index) => {
  const row = Math.floor(index / 11);
  const col = index - 11 * row;

  const frameID = `${row}-${col}`;
  const mapBuilderFrame = MAPS[1].params[frameID];

  const frame = { frameType: "none", ...mapBuilderFrame };

  return { id: frameID, ...frame } as MapFramesType;
});

const HistoryDefault = [
  {
    id: "history-row-0",
    stepMode: "season" as AllActionTypes,
    time: getCurrentDateTime(),
  },
];

type openInputStepType = null | {
  action: Omit<AllActionTypes, "season">;
  value?: string;
};

interface actionBarHandlerType {
  action: AllActionTypes;
  value?: string;
}

export default function ProcessActionPage() {
  const router = useRouter();

  const [gameState, setGameState] = useState<GameStateType>(GameStateDefault);

  const [coinsWallet, setCoinsWallet] = useState<CoinWalletType[]>(CoinWalletDefault);

  const [openInputStep, setOpenInputStep] = useState<openInputStepType>(null);

  const [mapFrames, setMapFrames] = useState<MapFramesType[]>(MapDefault);

  const [gameHistory, setGameHistory] = useState<HistoryRowType[]>(HistoryDefault);

  const addToHistory = (row: Omit<HistoryRowType, "id" | "time">) => {
    const newRow = {
      id: `history-row-${gameHistory.length}`,
      time: getCurrentDateTime(),
      ...row,
    };
    setGameHistory([newRow, ...gameHistory]);
  };

  const switchToNewSeason = () => {
    setGameState((prev) => ({
      ...prev,
      season: Math.min(prev.season + 1, 3),
      freeSkills: Math.max(prev.freeSkills, 1),
    }));
    addToHistory({ stepMode: "season" });
  };

  const walletHandler = (coins: number) => {
    setCoinsWallet((prev) => {
      const newWallet = [...prev];
      for (let i = 0; i < Math.abs(coins); i++) {
        if (coins > 0) {
          const index = newWallet.findIndex((el) => el.coinType == "none");
          console.log("...i", index);
          if (index >= 0) newWallet[index] = { ...newWallet[index], coinType: "added" };
        } else {
          const index = newWallet.findIndex((el) => el.coinType == "added");
          console.log("...i", index);
          if (index >= 0) newWallet[index] = { ...newWallet[index], coinType: "lost" };
        }
      }
      console.log("newWallet", coins, newWallet);
      return newWallet;
    });
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

  const inputHandler = (
    newMapFrames: MapFramesType[],
    coins: number = 0,
    ruin: boolean = false
  ) => {
    if (openInputStep) {
      const { oldFrames, newFrames } = mapFramesCompare(mapFrames, newMapFrames);

      const skillCost =
        openInputStep.action == "skill" && openInputStep?.value
          ? CARD_SKILL.find((el) => el.id == openInputStep.value)?.cost ?? 0
          : 0;

      const historyCoin = coins - skillCost;

      if (coins > 0) walletHandler(coins);

      if (openInputStep.action == "skill") {
        setGameState((prev) => ({ ...prev, freeSkills: 0 }));
      }
      if (skillCost > 0) {
        walletHandler(-skillCost);
      }

      const rowHistory = {
        stepMode: openInputStep.action as AllActionTypes,
        coins: historyCoin,
        ruin: ruin,
        oldFrames: oldFrames,
        newFrames: newFrames,
      };

      addToHistory(rowHistory);

      setMapFrames(newMapFrames);

      inputClose();
    }
  };

  const inputClose = () => {
    setOpenInputStep(null);
  };

  return (
    <Box component={"main"}>
      <TopAppBar router={router} />

      <Container component={"section"} sx={{ marginTop: 3 }}>
        <GameSeasonsStepper gameState={gameState} />

        <CoinWallet coinsWallet={coinsWallet} />

        <GameBoard
          openInputStep={Boolean(openInputStep)}
          mapFrames={mapFrames}
          inputHandler={inputHandler}
          inputClose={inputClose}
        />

        <GameActionHistory gameHistory={gameHistory} />
      </Container>

      <ActionBar
        coinsWallet={coinsWallet}
        gameState={gameState}
        actionBarHandler={actionBarHandler}
      />
    </Box>
  );
}
