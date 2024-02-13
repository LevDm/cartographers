import React from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

const res = [
  { title: "A", value: "av" },
  { title: "B", value: "bv" },
  { title: "C", value: "cv" },
  { title: "D", value: "dv" },
  { value: "x" },
];

export function GameSeasonScore() {
  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography>Счёт сезона</Typography>
      <Paper sx={{ padding: 1, width: "fit-content" }}>
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {res.map((el) => (
            <>
              {(el.title && (
                <Stack
                  direction={"column"}
                  spacing={1}
                  alignItems="stretch"
                  divider={<Divider orientation="horizontal" flexItem />}
                >
                  <Typography>{el.title}</Typography>
                  <Typography>{el.value}</Typography>
                </Stack>
              )) || <Typography variant="h4">{el.value}</Typography>}
            </>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
