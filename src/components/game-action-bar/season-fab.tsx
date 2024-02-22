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

import { SEASONS } from "@/data/elements";

import NavigationIcon from "@mui/icons-material/Navigation";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";
import { ActionBarPropsType } from "./types";

export const SeasonFab = observer((props: ActionBarPropsType) => {
  const { actionBarHandler } = props;

  const { season } = useStore();

  const title = season.get() !== 3 ? SEASONS[season.get() + 1].title : "Закончить";

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (season.get() == 3) setOpen(true);
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
});
