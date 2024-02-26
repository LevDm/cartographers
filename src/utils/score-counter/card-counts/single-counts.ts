import { getNeighbours, getNeighboursArea, notIncludes } from "../handlers";

import { Counter, CounterCoin } from "./_counter-type";

//
export const evil_counter: Counter = (filltredMap) => {
  const { none, evil } = filltredMap;

  const m = getNeighboursArea(evil).reduce((acc, point) => acc + (none.includes(point) ? 1 : 0), 0);

  return m;
};

//
export const coin_counter: CounterCoin = (filltredMap) => {
  const { none, hill } = filltredMap;

  const c = hill.reduce((acc: string[], point: string) => {
    return notIncludes(getNeighbours(point), none) ? [...acc, point] : acc;
  }, []);

  return c;
};
