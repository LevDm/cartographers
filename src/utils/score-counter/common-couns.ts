import { getFilltredMap } from "./handlers";

import { GameConfig, MapFramesType, SeasonScoresType } from "@/data/types";
import { seasonCounters } from "@/data/elements";
import { CARD_COUNTER, CounterTypes } from "@/data/cards";
import { coin_counter, evil_counter } from "./card-counts/single-counts";
import { isUndefined } from "lodash";

export const countScores = (scores: SeasonScoresType) => {
  const { p1, p2, c, m } = scores;
  return 1 + p1 + p2 + c - m;
};

export const mapCountig = (mapFrames: MapFramesType[], season: number, config: GameConfig) => {
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
    return cdata.count(filltredMap, mapFrames);
  });

  const m = evil_counter(filltredMap, mapFrames);
  const c = coin_counter(filltredMap, mapFrames);

  console.log(p1, p2, m, c);

  const res = {
    p1: 0,
    p2: 0,
    c: 0,
    m: 0,
  };
  return res;
};
