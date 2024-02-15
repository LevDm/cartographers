import React from "react";
import { MapFramesType } from "@/data/types";

type FrameProps = MapFramesType & {
  handler?: (id: string) => unknown;
  isEdit?: boolean;
  usageIn: "show" | "edit";
};

import { BASIC_FRAMES, PARAMS } from "@/data/elements";

export const Frame = React.memo((props: FrameProps) => {
  const { id, frameType, frameSubType, coinType, ruinType, isEdit, handler, usageIn } = props;

  const { bgc, imgSrc, disabled } = BASIC_FRAMES[frameType];

  const ruin = ruinType ? PARAMS.ruin : null;
  const coin = coinType ? PARAMS.coin : null;
  const sub = frameSubType ? BASIC_FRAMES[frameSubType] : null;

  const useInEdit = usageIn === "edit" && !disabled;

  const onClickHandler = () => {
    if (handler) handler(id);
  };

  const subBgc = sub?.bgc ?? bgc;

  return (
    <div
      style={{
        display: "flex",
        background: `linear-gradient(to bottom right, ${bgc} 50%, ${subBgc} 50%`,
        aspectRatio: "1/1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        opacity: useInEdit ? (isEdit ? 1 : 0.4) : 1,
      }}
      onClick={useInEdit ? onClickHandler : undefined}
    >
      <p style={{}}>
        {imgSrc}/{sub?.imgSrc ?? ""}-c{coin?.imgSrc ?? ""}-r{ruin?.imgSrc ?? ""}
      </p>
    </div>
  );
});
