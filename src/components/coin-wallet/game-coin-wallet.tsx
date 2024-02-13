import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const coins = [...Array(14)].map(() => ({
  state: "1",
}));

export function CoinWallet() {
  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography paddingRight={1}>Кошелек</Typography>

      <Paper sx={{}}>
        <Stack
          sx={{ width: "100%", padding: [1, 3] }}
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {coins.map((el, index) => (
            <div key={String(index)}>
              <Typography>{el.state}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
