import React, { useMemo, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CARD_COUNTER } from "@/data/cards";

import { COUNTERS } from "@/data/selectedCards";

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

/*
COUNTERS.data.map((counter, index)=>{
  const counterId = configCounters[index]
  const card = counter.cards.find((card) => card.id == counterId)

  return {
    title: counter.title,
    ...card,
    disabled
  }
})  
 */

const CardsViewModal = observer(() => {
  const { gameConfig } = useStore();
  const configCounters = gameConfig.get()?.countersIds ?? [];

  const cards = useMemo(() => {
    const allCards = [
      ...CARD_COUNTER.green,
      ...CARD_COUNTER.blue,
      ...CARD_COUNTER.red,
      ...CARD_COUNTER.violet,
    ];
    return configCounters.map((cardId) => allCards.find((card) => card.id == cardId)) ?? [];
  }, [configCounters]);

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
              >
                <Stack direction={"column"}>
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
