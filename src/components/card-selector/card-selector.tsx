import React, { useState } from "react";

import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import Image, { StaticImageData } from "next/image";
import { Controller, Control } from "react-hook-form";

export type CardType = {
  value: string;
  src: string | StaticImageData;
  disabled?: boolean;
};

type CardSelectorPropsType = {
  selectID: string;
  title: string;
  defaultValue?: string;
  required?: boolean;
  cards: CardType[];
  //
  error: boolean;
  control: any;
};

const CardSelector = React.memo((props: CardSelectorPropsType) => {
  const { cards, selectID, title, required, control, error } = props;

  return (
    <FormControl sx={{ margin: 1 }} error={error}>
      <InputLabel id={`${selectID}-label`} shrink>
        {title}
      </InputLabel>
      <Controller
        name={selectID}
        control={control}
        rules={{
          required: required,
        }}
        render={(props) => {
          return (
            <Select
              {...props.field}
              label={title}
              labelId={`${selectID}-label`}
              sx={{
                width: "fit-content",
                minWidth: 332,
                padding: 2,
                paddingBottom: 1,
              }}
              // deteted icon
              inputProps={{ sx: { padding: "0 !important" } }}
              IconComponent={() => null}
              displayEmpty
            >
              {cards.map((card: CardType) => (
                <MenuItem
                  key={`${selectID}-item-${card.value}`}
                  value={card.value}
                  disabled={card.disabled ?? false}
                >
                  <Image src={card.src} alt={""} width={300} style={{ borderRadius: 4 }} />
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
});
export default CardSelector;
