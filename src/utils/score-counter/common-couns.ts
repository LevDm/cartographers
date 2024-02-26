import { MapFramesType, SeasonScoresType } from "@/data/types";

import { getFilltredMap } from "./handlers";

export const countScores = (scores: SeasonScoresType) => {
  const { p1, p2, c, m } = scores;
  return 1 + p1 + p2 + c - m;
};

export const mapCountig = (mapFrames: MapFramesType[]) => {
  const filltredMap = getFilltredMap(mapFrames);

  const res = {
    p1: 0,
    p2: 0,
    c: 0,
    m: 0,
  };
  return res;
};
