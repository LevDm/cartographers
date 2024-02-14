import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { CoinWalletType } from "@/data/types";

type CoinWalletPropsType = {
  coinsWallet: CoinWalletType[];
};

export function CoinWallet(props: CoinWalletPropsType) {
  const { coinsWallet } = props;
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
          {coinsWallet.map((el) => (
            <div key={el.id}>
              <Typography>{el.coinType[0]}</Typography>
            </div>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
