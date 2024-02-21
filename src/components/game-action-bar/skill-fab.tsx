import React, { useState } from "react";

import {
  Button,
  Box,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AllActionTypes, CoinWalletType, GameStateType } from "@/data/types";
import { CARD_SKILL } from "@/data/cards";
import Image from "next/image";

import AddIcon from "@mui/icons-material/Add";

interface actionBarHandlerType {
  action: AllActionTypes;
  value: string;
}

type ActionBarPropsType = {
  coinsWallet: CoinWalletType[];
  gameState: GameStateType;
  actionBarHandler: (e: actionBarHandlerType) => unknown;
};
type SkillFabPropsType = ActionBarPropsType & {
  skillCardIds?: string[];
};

export function SkillFab(props: SkillFabPropsType) {
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
