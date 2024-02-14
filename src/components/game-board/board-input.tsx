import React, { useState } from "react";

import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { AllFrameTypes } from "@/data/types";
import { BASIC_FRAMES } from "@/data/elements";

type InputFieldProps = {
  location: {
    type: AllFrameTypes | undefined;
    subType: string | undefined;
    ruin: boolean;
  };
  applyDissabled: boolean;
  handleLocation: (v: any) => unknown;
  handleChoiseReset: () => unknown;
  handleChoiseApply: () => unknown;
};

type FieldLocationType = AllFrameTypes; // { value: string; title: string; srcImg: string };

const generalsLocationsType = Object.keys(BASIC_FRAMES) as AllFrameTypes[];

/*[
  { value: "home", title: "Поселение", srcImg: "" },
  { value: "tree", title: "Лес", srcImg: "" },
  { value: "brim", title: "Поля", srcImg: "" },
  { value: "pond", title: "Водоём", srcImg: "" },
  { value: "evil", title: "Монстры", srcImg: "" },
];
*/

export function InputField(props: InputFieldProps) {
  const { location, applyDissabled, handleLocation, handleChoiseReset, handleChoiseApply } = props;

  return (
    <Paper
      sx={{
        display: "flex",
        position: "absolute",
        width: "100%",
        height: 120,
        top: -128,
        padding: 1,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <FieldTypeSelect
          label="Местность"
          value={location.type}
          onChange={handleLocation}
          Items={generalsLocationsType}
        />

        <RuinSwitch />
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Button onClick={handleChoiseReset} startIcon={<RotateLeftIcon />}>
          Сбросить клетки
        </Button>
        <Button
          disabled={applyDissabled}
          onClick={handleChoiseApply}
          endIcon={<SendAndArchiveIcon />}
        >
          Применить
        </Button>
      </Stack>
    </Paper>
  );
}

function RuinSwitch() {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        borderRadius: "4px",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderStyle: "solid",
        height: "100%",
        paddingLeft: 2,
        paddingRight: 1,
      }}
    >
      <SendAndArchiveIcon />
      <Switch />
    </Stack>
  );
}

type FieldTypeSelectProps = {
  value: string | undefined;
  label: string;
  Items: FieldLocationType[];
  onChange: (v: string) => unknown;
};

function FieldTypeSelect(props: FieldTypeSelectProps) {
  const { value, label, Items, onChange } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    onChange(newValue);
  };

  return (
    <FormControl sx={{ minWidth: 130, height: "fit-content" }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select labelId="select-label" value={value} label={label} onChange={handleChange}>
        {Items.map((el) => (
          <MenuItem key={`select-item-${el}`} value={el}>
            <Stack direction={"row"} spacing={1}>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: BASIC_FRAMES[el].bgc,
                  border: "1px solid black",
                }}
              />
              <Typography>{BASIC_FRAMES[el].title}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
