import { Box, Divider, Grid, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import React, { ElementType } from "react";

import { CoinWalletType, CoinKinds } from "@/data/types";

type CoinWalletPropsType = {
  coinsWallet: CoinWalletType[];
};

import { COIN_PARAM } from "@/data/elements";
const COINS = COIN_PARAM.kind as CoinKinds;

export function CoinWallet(props: CoinWalletPropsType) {
  const { coinsWallet } = props;
  return (
    <Box sx={{ paddingTop: 1, marginTop: 2 }}>
      <Typography paddingRight={1}>Кошелек</Typography>

      <Paper sx={{}}>
        <Grid
          spacing={2}
          rowSpacing={2}
          sx={{
            width: "100%",
            padding: [1, 3],
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-between",
          }}
          direction={"row"}
        >
          {coinsWallet.map((el) => (
            <SvgIcon
              key={el.id}
              //inheritViewBox
              component={COINS[el.coinType].imgSrc as ElementType}
              htmlColor="transparent"
              sx={{
                minHeight: "30px",
                minWidth: "30px",
              }}
            />
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
