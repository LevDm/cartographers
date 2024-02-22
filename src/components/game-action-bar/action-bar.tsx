import React from "react";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { SkillFab } from "./skill-fab";
import { SeasonFab } from "./season-fab";
import { ActionBarPropsType } from "./types";

export function ActionBar(props: ActionBarPropsType) {
  const { actionBarHandler } = props;

  return (
    <Box
      sx={{
        marginTop: 3,
        paddingBottom: 1,
        zIndex: 1000,
        position: "sticky",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        "& > :not(style)": { m: 1 },
      }}
    >
      <SkillFab {...props} />
      <Fab
        color="primary"
        variant="extended"
        onClick={() => actionBarHandler({ action: "simpl", value: "" })}
      >
        <AddIcon sx={{ mr: 1 }} />
        Ход
      </Fab>
      <SeasonFab {...props} />
    </Box>
  );
}
