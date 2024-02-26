import { isUndefined, maxBy, min, sortBy, uniq } from "lodash";
import { findClusters, getNeighboursArea } from "../handlers";

import { Counter } from "./_counter-type";

//
export const red_counter_1: Counter = (filltredMap) => {
  const { home } = filltredMap;

  const r1 = findClusters(home).reduce((acc, claster) => acc + (claster.length >= 6 ? 8 : 0), 0);

  return r1;
};

//
export const red_counter_2: Counter = (filltredMap) => {
  const { hill, home } = filltredMap;

  const r2 =
    maxBy(
      findClusters(home).filter((cluster) => {
        const badCluster = getNeighboursArea(cluster).find((point) => hill.includes(point));
        return isUndefined(badCluster);
      }),
      (claster) => claster.length
    )?.length ?? 0;

  return r2;
};

//
export const red_counter_3: Counter = (filltredMap) => {
  const { hill, home, tree, pond, brim, evil } = filltredMap;

  const r3 =
    findClusters(home).filter((cluster) => {
      const targetCluster = uniq(
        getNeighboursArea(cluster).reduce((acc: string[], point) => {
          const newAcc = [...acc];
          if (tree.includes(point)) newAcc.push("tree");
          if (brim.includes(point)) newAcc.push("brim");
          if (pond.includes(point)) newAcc.push("pond");
          if (evil.includes(point)) newAcc.push("evil");
          if (hill.includes(point)) newAcc.push("hill");
          return newAcc;
        }, [])
      );

      if (targetCluster.length >= 3) return true;
      return false;
    }).length * 3;

  return r3;
};

//
export const red_counter_4: Counter = (filltredMap) => {
  const { home } = filltredMap;

  const homeClusters = sortBy(findClusters(home), (claster) => claster.length);
  const r4 = homeClusters[min([1, homeClusters.length - 1]) ?? 0].length * 2;

  return r4;
};
