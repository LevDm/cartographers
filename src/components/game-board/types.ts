import { AllActionTypes, AllFrameTypes, FrameParamsType, MapFramesType } from "@/data/types";

export type OpenInputStepType = null | {
  action: Omit<AllActionTypes, "season">;
  value: string;
};

export type GameBoardPropsType = {
  openInputStep: OpenInputStepType;
  inputHandler: InputHandlerType;
  inputClose: () => unknown;
};

export type InputHandlerType = (
  newMapFrames: MapFramesType[],
  coins?: number,
  ruin?: boolean
) => void;

export type InputBoardPropsType = {
  width: number | string;
  inputHandler: InputHandlerType;
};

export type LocationType = { type: AllFrameTypes[]; params: FrameParamsType[] };
