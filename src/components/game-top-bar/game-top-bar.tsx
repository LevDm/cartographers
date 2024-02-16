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
import { useRouter } from "next/router";

import ReplayIcon from "@mui/icons-material/Replay";

export function TopAppBar() {
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
