import React, { useState } from "react";

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

type CardsViewModalPropsType = {
  cards?: string[];
};

function CardsViewModal(props: CardsViewModalPropsType) {
  const { cards = ["1", "2", "3", "4"] } = props;
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
              <Button key={el} variant="outlined" disableRipple disableFocusRipple disableElevation>
                <Stack direction={"column"}>
                  <Typography variant="h6">{el}</Typography>
                  <div
                    style={{
                      height: "260px",
                      width: "200px",
                      backgroundColor: "red",
                    }}
                  />
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
}
