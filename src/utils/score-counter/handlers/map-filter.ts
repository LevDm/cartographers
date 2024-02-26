import { AllFrameTypes, FrameParamsType, MapFramesType } from "@/data/types";

import { isUndefined } from "lodash";

type FilltredFramesType = Exclude<AllFrameTypes | FrameParamsType, "coin">;

export type FilltredMapType = Record<FilltredFramesType, string[]>;

export const getFilltredMap = (mapFrames: MapFramesType[]) => {
  const frames: FilltredMapType = {
    none: [],
    //
    hill: [],
    //
    home: [],
    //
    tree: [],
    //
    ruin: [],
    pond: [],
    brim: [],
    //
    evil: [],
    //
    void: [],
  };

  for (const frame of mapFrames) {
    const { id, frameType, frameSubType, ruinType } = frame;

    if (isUndefined(frames?.[frameType])) continue;

    frames[frameType].push(id);
    if (!isUndefined(frameSubType) && frameSubType != "none") frames[frameSubType].push(id);
    if (!isUndefined(ruinType)) frames.ruin.push(id);
  }

  return frames;
};
