import {
  columnCoordinates,
  diagonalCoordinates,
  findLargestSquare,
  getNeighbours,
  notIncludes,
  rowCoordinates,
} from "../handlers";

import { Counter } from "./_counter-type";

//
export const violet_counter_1: Counter = (_, sourceMap) => {
  const filtredMap = sourceMap.filter((el) => el.frameType != "none").map((point) => point.id);

  const v1 = [...rowCoordinates(filtredMap), ...columnCoordinates(filtredMap)].reduce(
    (acc, line) => {
      const isfullLength = line.length == 11;
      return acc + (isfullLength ? 6 : 0);
    },
    0
  );

  return v1;
};

//
export const violet_counter_2: Counter = (_, sourceMap) => {
  const filtredMap = sourceMap
    .filter((el) => el.frameType != "none" && el.frameType != "void")
    .map((point) => point.id);

  const square = findLargestSquare(filtredMap).size;

  const v2 = (square > 1 ? square : 0) * 3;

  return v2;
};

//
export const violet_counter_3: Counter = (_, sourceMap) => {
  const filtredMap = sourceMap.filter((el) => el.frameType != "none").map((point) => point.id);

  const v3 = diagonalCoordinates(filtredMap).length * 3;

  return v3;
};

//
export const violet_counter_4: Counter = (filltredMap) => {
  const { none } = filltredMap;

  const v4 = none.reduce((acc: number, point: string) => {
    return acc + (notIncludes(getNeighbours(point), none) ? 1 : 0);
  }, 0);

  return v4;
};
