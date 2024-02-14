import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { CoinWalletType } from "@/data/types";

type CoinWalletPropsType = {
  coinsWallet: CoinWalletType[];
};

import { SUB_FRAMES, CoinKinds } from "@/data/elements";
const COINS = SUB_FRAMES.coin.kind as CoinKinds;

export function CoinWallet(props: CoinWalletPropsType) {
  const { coinsWallet } = props;
  return (
    <Box sx={{ paddingTop: 1, marginTop: 2 }}>
      <Typography paddingRight={1}>Кошелек</Typography>

      <Paper sx={{}}>
        <Stack
          sx={{ width: "100%", padding: [1, 3] }}
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {coinsWallet.map((el) => (
            <div key={el.id}>
              <Typography>{COINS[el.coinType].imgSrc}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
