import { getFilltredMap } from "./handlers";

import { GameConfig, MapFramesType, SeasonScoresType } from "@/data/types";
import { seasonCounters } from "@/data/elements";
import { CARD_COUNTER, CounterTypes } from "@/data/cards";
import { coin_counter, evil_counter } from "./card-counts/single-counts";
import { isUndefined } from "lodash";

export const countScores = (scores: SeasonScoresType) => {
  const { p1, p2, c, m } = scores;
  return 0 + p1 + p2 + c - m;
};

type CountingResultType = {
  p1: number;
  p2: number;
  c: string[];
  m: number;
};

type mapCountigType = (
  mapFrames: MapFramesType[],
  season: number,
  config: GameConfig
) => CountingResultType;

export const mapCountig: mapCountigType = (mapFrames, season, config) => {
  const { countersIds } = config;

  const targetCounters = (Object.keys(seasonCounters) as CounterTypes[]).filter((ctype) => {
    const seasonUsed = seasonCounters[ctype].used;
    return seasonUsed.includes(season);
  });

  const countersData = targetCounters.map((key) => {
    return CARD_COUNTER[key].find((counter) => countersIds.includes(counter.id));
  });

  const filltredMap = getFilltredMap(mapFrames);

  const [p1, p2] = countersData.map((cdata) => {
    if (isUndefined(cdata)) return -1;
    return Math.min(cdata.count(filltredMap, mapFrames), cdata.limitScores);
  });

  const m = evil_counter(filltredMap, mapFrames);
  const c = coin_counter(filltredMap, mapFrames);

  const res = {
    p1: p1,
    p2: p2,
    c: c,
    m: m,
  };
  return res;
};
