import React, { ElementType } from "react";
import { MapFramesType } from "@/data/types";

type FrameProps = MapFramesType & {
  handler?: (id: string) => unknown;
  isEdit?: boolean;
  usageIn: "show" | "edit";
};

import { BASIC_FRAMES, PARAMS, RUIN_PARAM } from "@/data/elements";
import { Button, SvgIcon } from "@mui/material";

export const Frame = React.memo((props: FrameProps) => {
  const { id, frameType, frameSubType, coinType, ruinType, isEdit, handler, usageIn } = props;

  const { bgc, imgSrc, disabled } = BASIC_FRAMES[frameType];

  const ruin = ruinType ? RUIN_PARAM.kind[ruinType] : null;
  const coin = coinType ? PARAMS.coin : null;
  const sub = frameSubType ? BASIC_FRAMES[frameSubType] : null;

  const useInEdit = usageIn === "edit" && !disabled;

  const onClickHandler = () => {
    if (handler) handler(id);
  };

  return (
    <Button
      sx={{
        aspectRatio: "1/1",
        display: "flex",
        //background: `linear-gradient(to bottom right, ${bgc} 50%, ${subBgc} 50%`,
        minWidth: "auto",
        backgroundColor: bgc,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        opacity: useInEdit ? (isEdit ? 1 : 0.4) : 1,
        position: "relative",
        padding: 0,
        margin: 0,
      }}
      disabled={!useInEdit}
      onClick={useInEdit ? onClickHandler : undefined}
    >
      <SvgIcon
        component={imgSrc as ElementType}
        htmlColor="transparent"
        sx={{ height: "90%", width: "90%" }}
      />
      {sub && (
        <SvgIcon
          component={sub.imgSrc as ElementType}
          htmlColor={sub.bgc ?? "transparent"}
          sx={{
            height: "60%",
            width: "60%",
            position: "absolute",
            top: "20%",
            left: "20%",
          }}
        />
      )}
      {ruin && (
        <SvgIcon
          component={ruin.imgSrc as ElementType}
          htmlColor="transparent"
          sx={{
            height: "80%",
            width: "80%",
            position: "absolute",
            top: "10%",
            left: "10%",
          }}
        />
      )}
      {coin && (
        <SvgIcon
          component={coin.imgSrc as ElementType}
          htmlColor="transparent"
          sx={{
            height: "40%",
            width: "40%",
            position: "absolute",
            top: "50%",
            left: "30%",
          }}
        />
      )}
    </Button>
  );
});
