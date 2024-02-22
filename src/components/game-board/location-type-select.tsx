import React, { ElementType, useState } from "react";

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

type AllFramesFieldsType = AllFrameTypes | FrameParamsType;

type FieldTypeSelectProps = {
  value: AllFramesFieldsType[];
  maxValueCount?: number;
  label: string;
  Items: AllFramesFieldsType[];
  itemsSrcData: BasicFramesType & ParamsType;
  onChange: (v: string[]) => unknown;
};

export function FieldTypeSelect(props: FieldTypeSelectProps) {
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
                      sx={{
                        height: "90%",
                        width: "90%",
                        maxHeight: "24px",
                        maxWidth: "24px",
                      }}
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
                  borderRadius: 4,
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
