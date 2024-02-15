import React from "react";
import { MapFramesType } from "@/data/types";

type FrameProps = MapFramesType & {
  handler?: (id: string) => unknown;
  isEdit?: boolean;
  usageIn: "show" | "edit";
};

import { BASIC_FRAMES, SUB_FRAMES } from "@/data/elements";

export const Frame = React.memo((props: FrameProps) => {
  const { id, frameType, frameSubType, isEdit, handler, usageIn } = props;

  const { bgc, imgSrc, disabled } = BASIC_FRAMES[frameType];

  const sumImdSrc = frameSubType ? SUB_FRAMES[frameSubType].kind.none.imgSrc : null;

  const useInEdit = usageIn === "edit" && !disabled;

  const onClickHandler = () => {
    if (handler) handler(id);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: bgc,
        aspectRatio: "1/1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        opacity: useInEdit ? (isEdit ? 1 : 0.4) : 1,
      }}
      onClick={useInEdit ? onClickHandler : undefined}
    >
      <p style={{}}>
        {imgSrc}-{sumImdSrc ?? ""}
      </p>
    </div>
  );
});
