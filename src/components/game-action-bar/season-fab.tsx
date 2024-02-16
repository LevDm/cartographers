import React, { useState } from "react";

import {
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AllActionTypes, GameStateType } from "@/data/types";
import { SEASONS } from "@/data/elements";

import NavigationIcon from "@mui/icons-material/Navigation";

interface actionBarHandlerType {
  action: AllActionTypes;
  value?: string;
}

interface SeasonFabPropsType {
  gameState: GameStateType;
  actionBarHandler: (e: actionBarHandlerType) => unknown;
}
export function SeasonFab(props: SeasonFabPropsType) {
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
