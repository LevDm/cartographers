"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Fab,
} from "@mui/material";

import { CoinWallet, GameActionHistory, GameBoard, GameSeasonsStepper } from "@/components";

import ReplayIcon from "@mui/icons-material/Replay";

import { useRouter } from "next/navigation";

import {
  CoinWalletType,
  GameStateType,
  AllActionTypes,
  MapFramesType,
  HistoryRowType,
  CoinTypes,
  AllFrameTypes,
} from "@/data/types";

import { MAPS } from "@/data/cards";

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
  const frameType = mapBuilderFrame?.frameType ?? ("none" as AllFrameTypes);
  const subFrameType = mapBuilderFrame?.frameSubType ?? undefined;
  return { id: frameID, frameType: frameType, frameSubType: subFrameType } as MapFramesType;
});

const HistoryDefault = [
  {
    id: "history-row-0",
    stepMode: "season" as AllActionTypes,
    time: getCurrentDateTime(),
  },
];

export default function ProcessActionPage() {
  const router = useRouter();

  const [gameState, setGameState] = useState<GameStateType>(GameStateDefault);

  const [coinsWallet, setCoinsWallet] = useState<CoinWalletType[]>(CoinWalletDefault);

  const [openInputStep, setOpenInputStep] = useState<null | Omit<AllActionTypes, "season">>(null);

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
  };

  const finishGame = () => {};

  const actionBarHandler = (action: AllActionTypes) => {
    switch (action) {
      case "simpl":
        setOpenInputStep(action);
        return;
      case "skill":
        //open select skills > check wallet > open input
        //setOpenInputStep(action);
        return;
      case "season":
        if (gameState.season === 3) finishGame();
        else switchToNewSeason();
        return;
    }
  };

  const inputHandler = (newMapFrames: MapFramesType[], coins: number = 0) => {
    if (openInputStep) {
      const { oldFrames, newFrames } = mapFramesCompare(mapFrames, newMapFrames);

      const ruin = false;

      const rowHistory = {
        stepMode: openInputStep as AllActionTypes,
        coins: coins,
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
      <TopAppBar />

      <Container component={"section"}>
        <Button onClick={() => router.replace("finished")}>Конец</Button>

        <GameSeasonsStepper gameState={gameState} />

        <CoinWallet coinsWallet={coinsWallet} />

        <GameBoard
          openInputStep={openInputStep}
          mapFrames={mapFrames}
          inputHandler={inputHandler}
          inputClose={inputClose}
        />

        <GameActionHistory gameHistory={gameHistory} />
      </Container>

      <ActionBar gameState={gameState} actionBarHandler={actionBarHandler} />
    </Box>
  );
}

function TopAppBar() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={() => router.back()}>
          <ReplayIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: 2, flexGrow: 1 }}>
          Игра
        </Typography>
        <Button color="inherit" onClick={() => router.push("//rules")}>
          Правила
        </Button>
      </Toolbar>
    </AppBar>
  );
}

import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";
import { mapFramesCompare } from "@/game-utils/map-compare";
import { getCurrentDateTime } from "@/game-utils/get-current-date-time";
import { SEASONS } from "@/data/elements";

type ActionBarPropsType = {
  gameState: GameStateType;
  actionBarHandler: (v: AllActionTypes) => unknown;
};

function ActionBar(props: ActionBarPropsType) {
  const { gameState, actionBarHandler } = props;
  const { season, freeSkills } = gameState;

  return (
    <Box
      sx={{
        marginTop: 3,
        paddingBottom: 1,
        zIndex: 1000,
        position: "sticky",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        "& > :not(style)": { m: 1 },
      }}
    >
      <Fab
        variant="extended"
        size="medium"
        disabled={freeSkills === 0}
        onClick={() => actionBarHandler("skill")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Навык
      </Fab>
      <Fab color="primary" variant="extended" onClick={() => actionBarHandler("simpl")}>
        <AddIcon sx={{ mr: 1 }} />
        Ход
      </Fab>
      <Fab variant="extended" size="medium" onClick={() => actionBarHandler("season")}>
        <NavigationIcon sx={{ mr: 1 }} />
        {season !== 3 ? SEASONS[season + 1].title : "Закончить"}
      </Fab>
    </Box>
  );
}
