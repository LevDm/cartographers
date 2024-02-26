import {
  columnCoordinates,
  findClusters,
  getNeighbours,
  getNeighboursArea,
  isBoard,
  notIncludes,
  rowCoordinates,
} from "../handlers";

import { Counter } from "./_counter-type";

//
export const green_counter_1: Counter = (filltredMap) => {
  const { tree } = filltredMap;

  const g1 = tree.reduce((acc: number, point: string) => acc + (isBoard(point) ? 1 : 0), 0);

  return g1;
};

//
export const green_counter_2: Counter = (filltredMap) => {
  const { tree } = filltredMap;

  const g2 = rowCoordinates(tree).length + columnCoordinates(tree).length;

  return g2;
};

//
export const green_counter_3: Counter = (filltredMap) => {
  const { none, tree } = filltredMap;

  const g3 = tree.reduce((acc: number, point: string) => {
    return acc + (notIncludes(getNeighbours(point), none) ? 1 : 0);
  }, 0);

  return g3;
};

//
export const green_counter_4: Counter = (filltredMap) => {
  const { hill, tree } = filltredMap;

  const g4 = findClusters(tree).reduce((acc, cluster) => {
    let res = 0;
    const hills = getNeighboursArea(cluster).filter((point) => hill.includes(point)).length;
    if (hills >= 2) res = 3 * hills;
    return acc + res;
  }, 0);

  return g4;
};
