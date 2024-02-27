import React, { useMemo, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { CARD_COUNTER } from "@/data/cards";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

import { CounterTypes } from "@/data/cards";
import { seasonCounters } from "@/data/elements";

export const CardsViewModal = observer(() => {
  const { season, gameConfig } = useStore();
  const configCounters = gameConfig.get()?.countersIds ?? [];
  const curSeason = season.get();

  const cards = useMemo(() => {
    const counters = (Object.keys(seasonCounters) as CounterTypes[]).map((key) => {
      const card = CARD_COUNTER[key].find((card) => configCounters.includes(card.id));
      const counterData = seasonCounters[key];
      const inSeasonUsed = counterData.used.includes(curSeason);
      return {
        counterTitle: counterData.title,
        ...card,
        disabled: !inSeasonUsed,
      };
    });
    return counters;
  }, [configCounters, curSeason]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} size="small">
        Посмотреть все
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="orders-dialog-title"
      >
        <DialogTitle id="orders-dialog-title">Приказы игры</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {cards.map((el, index) => (
              <Button
                key={el?.id ?? `game-counter-${index}`}
                variant="outlined"
                disableRipple
                disableFocusRipple
                disableElevation
                disabled={el.disabled}
              >
                <Stack direction={"column"} alignItems={"flex-start"}>
                  <Typography sx={{ fontWeight: "700", textTransform: "none" }}>
                    {el.counterTitle}. {el.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, textTransform: "none" }}>
                    Лимит очков:{el.limitScores}
                  </Typography>
                  <Image src={el?.imgSrc ?? ""} alt={""} width={200} style={{ borderRadius: 4 }} />
                </Stack>
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
