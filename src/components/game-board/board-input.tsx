import React, { ElementType, useState } from "react";

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
  SvgIcon,
  Switch,
  Typography,
} from "@mui/material";

import { AllFrameTypes, FrameParamsType } from "@/data/types";
import { BASIC_FRAMES, BasicFramesType, PARAMS, ParamsType } from "@/data/elements";

export type LocationType = { type: AllFrameTypes[]; params: FrameParamsType[] };

type InputFieldProps = {
  location: LocationType;
  applyDissabled: boolean;
  handleLocationType: (v: AllFrameTypes[]) => unknown;
  handleLocationParams: (v: FrameParamsType[]) => unknown;
  handleChoiseReset: () => unknown;
  handleChoiseApply: () => unknown;
};

const generalsLocationsType = Object.keys(BASIC_FRAMES).filter(
  (el) => !["void", "hill"].includes(el)
) as AllFrameTypes[];

const generalsLocationsSubType = Object.keys(PARAMS) as FrameParamsType[];

export function InputField(props: InputFieldProps) {
  const {
    location,
    applyDissabled,
    handleLocationType,
    handleLocationParams: handleLocationSubType,
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
          itemsSrcData={BASIC_FRAMES as BasicFramesType & ParamsType}
        />

        <FieldTypeSelect
          label="Параметры"
          value={location.params}
          onChange={(v) => handleLocationSubType(v as FrameParamsType[])}
          Items={generalsLocationsSubType}
          itemsSrcData={PARAMS as BasicFramesType & ParamsType}
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

type AllFramesFieldsType = AllFrameTypes | FrameParamsType;

type FieldTypeSelectProps = {
  value: AllFramesFieldsType[];
  maxValueCount?: number;
  label: string;
  Items: AllFramesFieldsType[];
  itemsSrcData: BasicFramesType & ParamsType;
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
        renderValue={(selected: AllFramesFieldsType[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((el) => (
              <Chip
                key={el}
                sx={{
                  backgroundColor: itemsSrcData[el].bgc,
                  border: "1px solid grey",
                }}
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SvgIcon
                      component={itemsSrcData[el].imgSrc as ElementType}
                      htmlColor="transparent"
                      sx={{ height: "90%", width: "90%" }}
                    />
                  </div>
                }
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SvgIcon
                  component={itemsSrcData[el].imgSrc as ElementType}
                  htmlColor="transparent"
                  sx={{ height: "90%", width: "90%" }}
                />
              </div>
              <Typography>{itemsSrcData[el].title}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
