//
export type AllFrameTypes = "none" | "hill" | "home" | "tree" | "evil" | "brim" | "pond" | "void";
export type AllFrameSubTypes = "coin" | "ruin";

export type AllActionTypes = "skill" | "simpl" | "season";

export type SeasonScoresType = { p1: number; p2: number; c: number; m: number };
export type GameStateType = {
  season: number;
  scores: SeasonScoresType[];
  freeSkills: number;
};

export type CoinTypes = "none" | "added" | "lost";
export type CoinWalletType = {
  id: string;
  coinType: CoinTypes;
};

export type MapFramesType = {
  id: string;
  frameType: AllFrameTypes;
  frameSubType?: AllFrameSubTypes;
};

export type HistoryRowType = {
  id: string;
  stepMode: AllActionTypes;
  time: string | Date;
  coins?: number;
  ruin?: boolean;
  oldFrames?: { count: number; kind: AllFrameTypes }[];
  newFrames?: { count: number; kind: AllFrameTypes }[];
};
