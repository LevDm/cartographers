import React from "react";

import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import Image from "next/image";
import { Controller } from "react-hook-form";
import { SelectCardType } from "@/data/types";

type CardSelectorPropsType = {
  selectID: string;
  title: string;
  defaultValue?: string;
  required?: boolean;
  cards: SelectCardType[];
  //
  error: boolean;
  control: any;
};

export const CardSelector = React.memo((props: CardSelectorPropsType) => {
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
              {cards.map((card: SelectCardType) => (
                <MenuItem
                  key={`${selectID}-item-${card.id}`}
                  value={card.id}
                  disabled={card.disabled ?? false}
                >
                  <Image src={card.imgSrc} alt={""} width={300} style={{ borderRadius: 4 }} />
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
});
