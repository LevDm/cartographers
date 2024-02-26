import { AllFrameTypes, FrameParamsType, SeasonScoresType } from "@/data/types";

import { isUndefined, mapValues, maxBy, min, sortBy, sum, uniq } from "lodash";

export const countScores = (scores: SeasonScoresType) => {
  const { p1, p2, c, m } = scores;
  return 1 + p1 + p2 + c - m;
};

import { MapFramesType } from "@/data/types";

const MAP_SIZE = 11;

export const mapCountig = (mapFrames: MapFramesType[]) => {
  /*
  const monsters = mapFrames.filter((el) => el.frameType != "none");

  diagonalCoordinates(11, filtredMap);
  rowCoordinates(11, filtredMap);
  columnCoordinates(11, filtredMap);
  findLargestSquare(11, filtredMap);

  getNeighbours("2-2");
  getNeighboursArea(["0-1", "1-1"]);

  findClusters(filtredMap.map((el) => el.id));
 */
  const { none, hill, home, tree, ruin, pond, brim, evil } = getFiltredMap(mapFrames);

  const isBoard = (point: string) => {
    const [x, y] = getCoords(point);
    if (x == 0 || y == 0 || x == 10 || y == 10) return true;
    return false;
  };
  // green
  // 1
  const g1 = tree.reduce((acc, point) => acc + (isBoard(point) ? 1 : 0), 0);
  // 2
  const g2 = rowCoordinates(11, tree).length + columnCoordinates(11, tree).length;
  // 3
  const g3 = tree.reduce((acc: number, point: string) => {
    return acc + (notIncludes(getNeighbours(point), none) ? 1 : 0);
  }, 0);
  //4
  const g4 = findClusters(tree).reduce((acc, cluster) => {
    let res = 0;
    const hills = getNeighboursArea(cluster).filter((point) => hill.includes(point)).length;
    if (hills >= 2) res = 3 * hills;
    return acc + res;
  }, 0);
  console.log("green", g1, g2, g3, g4);
  // blue
  // 1
  const b1 =
    getNeighboursArea(brim).filter((point) => pond.includes(point)).length +
    getNeighboursArea(pond).filter((point) => brim.includes(point)).length;
  // 2
  const b2 = getNeighboursArea(hill).reduce(
    (acc, point) => acc + (brim.includes(point) ? 1 : 0) + (pond.includes(point) ? 2 : 0),
    0
  );
  // 3
  const b3 =
    getNeighboursArea(ruin).reduce((acc, point) => acc + (pond.includes(point) ? 1 : 0), 0) +
    ruin.reduce((acc, point) => acc + (brim.includes(point) ? 3 : 0), 0);
  // 4
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
  console.log("blue", b1, b2, b3, b4);
  // red
  // 1
  const r1 = findClusters(home).reduce((acc, claster) => acc + (claster.length >= 6 ? 8 : 0), 0);
  //2
  const r2 =
    maxBy(
      findClusters(home).filter((cluster) => {
        const badCluster = getNeighboursArea(cluster).find((point) => hill.includes(point));
        return isUndefined(badCluster);
      }),
      (claster) => claster.length
    )?.length ?? 0;

  //4
  const homeClusters = sortBy(findClusters(home), (claster) => claster.length);
  const r4 = homeClusters[min([1, homeClusters.length - 1]) ?? 0].length * 2;
  //3
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
  console.log("red", r1, r2, r3, r4);

  // violet
  const filtredMap = mapFrames.filter((el) => el.frameType != "none").map((point) => point.id);
  // 1

  const v1 = [...rowCoordinates(11, filtredMap), ...rowCoordinates(11, filtredMap)].reduce(
    (acc, line) => {
      return acc + (line.length == 11 ? 6 : 0);
    },
    0
  );

  const v2 = findLargestSquare(11, filtredMap).size * 3;

  const v3 = diagonalCoordinates(11, filtredMap).length * 3;

  const v4 = none.reduce((acc: number, point: string) => {
    return acc + (notIncludes(getNeighbours(point), none) ? 1 : 0);
  }, 0);

  console.log("violet", v1, v2, v3, v4);

  // general =================
  const monsterScores = getNeighboursArea(evil).reduce(
    (acc, point) => acc + (none.includes(point) ? 1 : 0),
    0
  );

  const hillScores = hill.reduce((acc: string[], point: string) => {
    return notIncludes(getNeighbours(point), none) ? [...acc, point] : acc;
  }, []);

  console.log("monsterScores", monsterScores);
  console.log("hillScores", hillScores);

  const res = {
    p1: 0,
    p2: 0,
    c: 0,
    m: 0,
  };
  return res;
};

type FiltredFramesType = Exclude<AllFrameTypes | FrameParamsType, "coin">;

const getFiltredMap = (mapFrames: MapFramesType[]) => {
  const frames: Record<FiltredFramesType, string[]> = {
    none: [],
    //
    hill: [],
    //
    home: [],
    //
    tree: [],
    //
    ruin: [],
    pond: [],
    brim: [],
    //
    evil: [],
    //
    void: [],
  };

  for (const frame of mapFrames) {
    const { id, frameType, frameSubType, ruinType } = frame;

    if (isUndefined(frames?.[frameType])) continue;

    frames[frameType].push(id);
    if (!isUndefined(frameSubType) && frameSubType != "none") frames[frameSubType].push(id);
    if (!isUndefined(ruinType)) frames.ruin.push(id);
  }

  return frames;
};

const notIncludes = (points: string[], baned: string[]) =>
  points.reduce((acc, point) => acc && !baned.includes(point), true);

const getCoords = (point: string) => point.split("-").map((el: string) => parseInt(el));

const geObjMapFrames = (mapFrames: MapFramesType[]) =>
  mapFrames.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, MapFramesType>);

export function getNeighbours(id: string) {
  const [x0, y0] = id.split("-").map((el: string) => parseInt(el));
  const [min, max] = [0, 11];
  const res = [];

  for (const dx of [-1, 0, 1]) {
    for (const dy of [-1, 0, 1]) {
      if (Math.abs(dx) + Math.abs(dy) > 1) continue;
      const x = x0 + dx;
      const y = y0 + dy;
      if (x == x0 && y == y0) continue;
      if (x >= min && x < max && y >= min && y < max) {
        res.push(`${x}-${y}`);
      }
    }
  }
  //console.log("getNeighbours", res);
  return res;
}

export function getNeighboursArea(ids: string[]) {
  const neighs = ids.flatMap((id) => getNeighbours(id));
  const uniqNeighs = uniq(neighs);
  const filterUniqNeighs = uniqNeighs.filter((el) => !ids.includes(el));
  //console.log("getNeighboursArea", filterUniqNeighs);
  return filterUniqNeighs;
}

export function diagonalCoordinates(size: number, mapFrames: string[]) {
  const diagonalCoords = [];

  for (let k = 0; k < size; k++) {
    let row = k;
    let col = 0;
    const currentDiagonal = [];
    while (row < size && col < size) {
      const coord = `${row}-${col}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentDiagonal.push(element);
      }
      row++;
      col++;
    }
    if (currentDiagonal.length == size - k) {
      diagonalCoords.push(currentDiagonal);
    }
  }
  //console.log("diagonalCoordinates", diagonalCoords);
  return diagonalCoords;
}

export function rowCoordinates(size: number, mapFrames: string[]) {
  const rowCoords = [];

  for (let i = 0; i < size; i++) {
    const currentRow = [];
    for (let j = 0; j < size; j++) {
      const coord = `${i}-${j}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentRow.push(element);
      }
    }
    if (currentRow.length > 0) {
      //== size
      rowCoords.push(currentRow);
    }
  }
  //console.log("rowCoordinates", rowCoords);
  return rowCoords;
}

export function columnCoordinates(size: number, mapFrames: string[]) {
  const colCoords = [];

  for (let j = 0; j < size; j++) {
    const currentCol = [];
    for (let i = 0; i < size; i++) {
      const coord = `${i}-${j}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentCol.push(element);
      }
    }
    if (currentCol.length > 0) {
      //== size
      colCoords.push(currentCol);
    }
  }
  //console.log("columnCoordinates", colCoords);
  return colCoords;
}

export function findLargestSquare(matrixSize: number, elements: string[]) {
  const square = new Array(matrixSize).fill(null).map(() => new Array(matrixSize).fill(null));

  let largestSquareSize = 0;
  let largestSquareStartRow = -1;
  let largestSquareStartCol = -1;

  for (let element of elements) {
    const [x, y] = element.split("-").map(Number);
    if (x < matrixSize && y < matrixSize) {
      square[x][y] = element;
    }
  }

  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      if (square[row][col]) {
        let squareSize = 1;
        while (row + squareSize < matrixSize && col + squareSize < matrixSize) {
          let validSquare = true;
          for (let i = row; i <= row + squareSize; i++) {
            if (!square[i][col + squareSize]) {
              validSquare = false;
              break;
            }
          }
          for (let j = col; j <= col + squareSize; j++) {
            if (!square[row + squareSize][j]) {
              validSquare = false;
              break;
            }
          }
          if (validSquare) {
            squareSize++;
          } else {
            break;
          }
        }

        if (squareSize > largestSquareSize) {
          largestSquareSize = squareSize;
          largestSquareStartRow = row;
          largestSquareStartCol = col;
        }
      }
    }
  }
  const res = {
    size: largestSquareSize,
    startRow: largestSquareStartRow,
    startCol: largestSquareStartCol,
  };
  //console.log("findLargestSquare", res);
  return res;
}

export function findClusters(coordinates: string[]) {
  let points = [...coordinates];

  const euclideanDistance = (point1: string, point2: string) => {
    const [x1, y1] = point1.split("-").map((el: string) => parseInt(el));
    const [x2, y2] = point2.split("-").map((el: string) => parseInt(el));
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  const isNeighbor = (point1: string, point2: string) => euclideanDistance(point1, point2) == 1;

  function findNeighbors(point: string, sourcePoints: string[]) {
    const neighbors = [point];
    for (const p of sourcePoints) {
      if (isNeighbor(point, p)) {
        const n = findNeighbors(
          p,
          sourcePoints.filter((el) => el != p)
        );
        neighbors.push(...n);
      }
    }
    return uniq(neighbors);
  }

  const clusters = [];
  while (points.length > 0) {
    const currentPoint = points.shift() ?? "";
    const cluster = findNeighbors(currentPoint, [...points]);
    if (cluster.length > 1) clusters.push(cluster);
    points = points.filter((point) => !cluster.includes(point));
  }
  //console.log("findClusters", clusters);
  return clusters;
}
