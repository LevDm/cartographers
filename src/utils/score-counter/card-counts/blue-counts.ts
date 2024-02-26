import { isUndefined, sum } from "lodash";

import { findClusters, getNeighbours, getNeighboursArea, isBoard } from "../handlers";

import { Counter } from "./_counter-type";

//
export const blue_counter_1: Counter = (filltredMap) => {
  const { pond, brim } = filltredMap;

  const b1 =
    getNeighboursArea(brim).filter((point) => pond.includes(point)).length +
    getNeighboursArea(pond).filter((point) => brim.includes(point)).length;

  return b1;
};

//
export const blue_counter_2: Counter = (filltredMap) => {
  const { hill, pond, brim } = filltredMap;

  const b2 = getNeighboursArea(hill).reduce(
    (acc, point) => acc + (brim.includes(point) ? 1 : 0) + (pond.includes(point) ? 2 : 0),
    0
  );

  return b2;
};

//
export const blue_counter_3: Counter = (filltredMap) => {
  const { ruin, pond, brim } = filltredMap;

  const b3 =
    getNeighboursArea(ruin).reduce((acc, point) => acc + (pond.includes(point) ? 1 : 0), 0) +
    ruin.reduce((acc, point) => acc + (brim.includes(point) ? 3 : 0), 0);

  return b3;
};

//
export const blue_counter_4: Counter = (filltredMap) => {
  const { pond, brim } = filltredMap;

  const target = [brim, pond];
  const b4 = sum(
    target.map((frameType, index) => {
      const targetClusters = findClusters(frameType).filter((cluster) => {
        const badPoint = cluster.find((point) => {
          const badNeighbour = getNeighbours(point).find((p) =>
            target[index == 0 ? 1 : 0].includes(p)
          );
          return isBoard(point) || !isUndefined(badNeighbour);
        });

        return isUndefined(badPoint);
      });
      return targetClusters.length * 3;
    })
  );
  return b4;
};
