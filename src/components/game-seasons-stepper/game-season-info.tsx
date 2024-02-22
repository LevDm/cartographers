import React, { useMemo, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { CARD_COUNTER } from "@/data/cards";

import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

export function GameSeasonInfo(props: { text: string }) {
  const { text } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingTop: 1 }}>
      <Typography>Приказы игры</Typography>
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Typography>{text}</Typography>
        <CardsViewModal />
      </Paper>
    </Box>
  );
}

import { CounterTypes } from "@/data/cards";
import { seasonCounters } from "@/data/elements";

const CardsViewModal = observer(() => {
  const { season, gameConfig } = useStore();
  const configCounters = gameConfig.get()?.countersIds ?? [];

  const cards = useMemo(() => {
    const counters = (Object.keys(seasonCounters) as CounterTypes[]).map((key) => {
      const card = CARD_COUNTER[key].find((card) => configCounters.includes(card.id));
      const counterData = seasonCounters[key];
      const inSeasonUsed = counterData.used.includes(season.get());
      return {
        counterTitle: counterData.title,
        ...card,
        disabled: !inSeasonUsed,
      };
    });
    return counters;
  }, [configCounters, season]);

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
            {cards.map((el) => (
              <Button
                key={el?.id}
                variant="outlined"
                disableRipple
                disableFocusRipple
                disableElevation
                disabled={el.disabled}
              >
                <Stack direction={"column"}>
                  <Typography>{el.counterTitle}</Typography>
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
