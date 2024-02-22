import { Box, Grid, Paper, SvgIcon, Typography } from "@mui/material";
import React, { ElementType } from "react";

import { CoinKinds } from "@/data/types";

import { COIN_PARAM } from "@/data/elements";

import { useStore } from "@/mobx-store/use-store-provider";
import { observer } from "mobx-react-lite";

const COINS = COIN_PARAM.kind as CoinKinds;

export const CoinWallet = observer(() => {
  const { coinsWallet } = useStore();

  return (
    <Box sx={{ paddingTop: 1, marginTop: 2 }}>
      <Typography paddingRight={1}>Кошелек</Typography>

      <Paper sx={{}}>
        <Grid
          sx={{
            width: "100%",
            padding: [1, 3],
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-between",
          }}
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
});
