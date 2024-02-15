import React, { useState } from "react";

import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { AllFrameSubTypes, AllFrameTypes } from "@/data/types";
import { BASIC_FRAMES, SUB_FRAMES } from "@/data/elements";

type InputFieldProps = {
  location: {
    type: AllFrameTypes[];
    subType: AllFrameSubTypes[];
  };
  applyDissabled: boolean;
  handleLocationType: (v: AllFrameTypes[]) => unknown;
  handleLocationSubType: (v: AllFrameSubTypes[]) => unknown;
  handleChoiseReset: () => unknown;
  handleChoiseApply: () => unknown;
};

const generalsLocationsType = Object.keys(BASIC_FRAMES).filter(
  (el) => !["void", "hill"].includes(el)
) as AllFrameTypes[];

const generalsLocationsSubType = Object.keys(SUB_FRAMES) as AllFrameSubTypes[];

export function InputField(props: InputFieldProps) {
  const {
    location,
    applyDissabled,
    handleLocationType,
    handleLocationSubType,
    handleChoiseReset,
    handleChoiseApply,
  } = props;

  return (
    <Paper
      sx={{
        display: "flex",
        position: "absolute",
        width: "100%",
        height: 140,
        top: -148,
        padding: 1,
        paddingTop: 2,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <FieldTypeSelect
          label="Местность"
          value={location.type}
          onChange={(v) => handleLocationType(v as AllFrameTypes[])}
          Items={generalsLocationsType}
          itemsSrcData={BASIC_FRAMES}
        />

        <FieldTypeSelect
          label="Параметры"
          value={location.subType}
          onChange={(v) => handleLocationSubType(v as AllFrameSubTypes[])}
          Items={generalsLocationsSubType}
          itemsSrcData={SUB_FRAMES}
        />
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

type AllFrames = AllFrameTypes | AllFrameSubTypes;

type FieldTypeSelectProps = {
  value: AllFrames[];
  maxValueCount?: number;
  label: string;
  Items: AllFrames[];
  itemsSrcData: Record<AllFrames, { title: string; bgc: string }>;
  onChange: (v: string[]) => unknown;
};

function FieldTypeSelect(props: FieldTypeSelectProps) {
  const { value, label, Items, onChange, maxValueCount = 2, itemsSrcData } = props;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value;
    const newValueList = typeof newValue === "string" ? newValue.split(",") : newValue;
    if (newValueList.length <= maxValueCount) onChange(newValueList);
  };

  return (
    <FormControl sx={{ minWidth: 140, height: "100%" }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        multiple
        value={value}
        label={label}
        onChange={handleChange}
        //input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: (AllFrameTypes | AllFrameSubTypes)[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((el) => (
              <Chip
                key={el}
                sx={{
                  backgroundColor: itemsSrcData[el].bgc,
                  border: "1px solid grey",
                }}
                label={"##"}
              />
            ))}
          </Box>
        )}
      >
        {Items.map((el) => (
          <MenuItem key={`select-item-${el}`} value={el}>
            <Stack direction={"row"} spacing={1}>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: itemsSrcData[el].bgc,
                  border: "1px solid black",
                }}
              />
              <Typography>{itemsSrcData[el].title}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
