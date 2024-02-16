"use client";
import React, { useState } from "react";

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
} from "@/data/types";

import { CARD_SKILL, MAPS } from "@/data/cards";

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
      <TopAppBar />

      <Container component={"section"} sx={{ padding: [2, 0] }}>
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

function TopAppBar() {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <RestartGameButton handleClick={() => router.back()} />
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
interface RestartGameProps {
  handleClick: () => unknown;
}
function RestartGameButton(props: RestartGameProps) {
  const { handleClick } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    handleClose();
    handleClick();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <ReplayIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="restart-dialog-title"
        aria-describedby="restart-dialog-description"
      >
        <DialogTitle id="restart-dialog-title">Перезапустить игру?</DialogTitle>
        <DialogContent>
          <DialogContentText id="restart-dialog-description">
            Перезапуск сбросит все начальные параметры и прогресс игры
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleApply} autoFocus>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";
import { mapFramesCompare } from "@/game-utils/map-compare";
import { getCurrentDateTime } from "@/game-utils/get-current-date-time";
import { SEASONS } from "@/data/elements";
import Image from "next/image";

type ActionBarPropsType = {
  coinsWallet: CoinWalletType[];
  gameState: GameStateType;
  actionBarHandler: (e: actionBarHandlerType) => unknown;
};

function ActionBar(props: ActionBarPropsType) {
  const { actionBarHandler } = props;

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
      <SkillFab {...props} />
      <Fab color="primary" variant="extended" onClick={() => actionBarHandler({ action: "simpl" })}>
        <AddIcon sx={{ mr: 1 }} />
        Ход
      </Fab>
      <SeasonFab {...props} />
    </Box>
  );
}

interface SeasonFabPropsType {
  gameState: GameStateType;
  actionBarHandler: (e: actionBarHandlerType) => unknown;
}
function SeasonFab(props: SeasonFabPropsType) {
  const { gameState, actionBarHandler } = props;

  const { season } = gameState;

  const title = season !== 3 ? SEASONS[season + 1].title : "Закончить";

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (season == 3) setOpen(true);
    else actionBarHandler({ action: "season", value: "next" });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    handleClose();
    actionBarHandler({ action: "season", value: "finish" });
  };

  return (
    <>
      <Fab variant="extended" size="medium" onClick={handleClickOpen}>
        <NavigationIcon sx={{ mr: 1 }} />
        {title}
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="finish-dialog-title"
        aria-describedby="finish-dialog-description"
      >
        <DialogTitle id="finish-dialog-title">Закончить игру?</DialogTitle>
        <DialogContent>
          <DialogContentText id="finish-dialog-description">
            После подтерждения возвращение на эту страницу будет недоступно
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleApply} autoFocus>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type SkillFabPropsType = ActionBarPropsType & {
  skillCardIds?: string[];
};

function SkillFab(props: SkillFabPropsType) {
  const {
    coinsWallet,
    gameState,
    actionBarHandler,
    skillCardIds = [
      "skill-1",
      "skill-2",
      "skill-3",
      "skill-4",
      "skill-5",
      "skill-6",
      "skill-7",
      "skill-8",
    ],
  } = props;
  const { freeSkills } = gameState;

  const coinsCount = coinsWallet.reduce((acc, el) => acc + (el.coinType == "added" ? 1 : 0), 0);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    actionBarHandler({ action: "skill", value: value });
    handleClose();
  };

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Fab
        variant="extended"
        size="medium"
        disabled={freeSkills === 0}
        onClick={() => handleClickOpen()}
      >
        <AddIcon sx={{ mr: 1 }} />
        Навык
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="dialog-skils-title"
        aria-describedby="dialog-skils-content"
      >
        <DialogTitle id="dialog-skils-title">Использование навыка</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl>
            <FormLabel id="skils-radio-buttons-group">Выбери навык</FormLabel>
            <RadioGroup
              aria-labelledby="skils-radio-buttons-group"
              name="skils-controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              sx={{ gap: 2 }}
            >
              {CARD_SKILL.map(
                (el) =>
                  (skillCardIds.includes(el.id) && (
                    <FormControlLabel
                      key={el.id}
                      value={el.id}
                      disabled={el.cost > coinsCount}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography>{el.title}</Typography>
                          <Typography>Стоимость: {el.cost}x монет(ы)</Typography>
                          <Image src={el.imgSrc} alt={""} width={200} style={{ borderRadius: 4 }} />
                        </Box>
                      }
                    />
                  )) ||
                  null
              )}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button disabled={!Boolean(value) && value === ""} onClick={handleApply}>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
