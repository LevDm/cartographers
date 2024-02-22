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
import { LocationType } from "./types";
import { FieldTypeSelect } from "./location-type-select";

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
    handleLocationParams,
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
          onChange={(v) => handleLocationParams(v as FrameParamsType[])}
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
