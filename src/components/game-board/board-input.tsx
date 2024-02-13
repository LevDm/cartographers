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

type InputFieldProps = {
  handleChoiseReset: () => unknown;
  handleChoiseApply: () => unknown;
};

type FieldLocationType = { value: string; title: string; srcImg: string };

const generalsLocationsType = [
  { value: "home", title: "Поселение", srcImg: "" },
  { value: "tree", title: "Лес", srcImg: "" },
  { value: "brim", title: "Поля", srcImg: "" },
  { value: "pond", title: "Водоём", srcImg: "" },
  { value: "evil", title: "Монстры", srcImg: "" },
];

export function InputField(props: InputFieldProps) {
  const { handleChoiseReset, handleChoiseApply } = props;

  const [location, setLocation] = useState<{
    type: string | undefined;
    subType: string | undefined;
    ruin: boolean;
  }>({ type: undefined, subType: undefined, ruin: false });

  const locTypeHandler = (value: string) => {
    setLocation((prev) => ({
      ...prev,
      type: value,
    }));
  };

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
          onChange={locTypeHandler}
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
          disabled={!Boolean(location.type)}
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
          <MenuItem key={`select-item-${el.value}`} value={el.value}>
            <Stack direction={"row"} spacing={1}>
              <RotateLeftIcon />
              <Typography>{el.title}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
