import { uniq } from "lodash";

const MAP_SIZE = 11;

export const isBoard = (point: string) => {
  const [x, y] = getCoords(point);
  if (x == 0 || y == 0 || x == 10 || y == 10) return true;
  return false;
};

export const notIncludes = (points: string[], baned: string[]) =>
  points.reduce((acc, point) => acc && !baned.includes(point), true);

export const getCoords = (point: string) => point.split("-").map((el: string) => parseInt(el));

export function getNeighbours(id: string) {
  const [x0, y0] = getCoords(id);
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

export function diagonalCoordinates(mapFrames: string[]) {
  const diagonalCoords = [];

  for (let k = 0; k < MAP_SIZE; k++) {
    let row = k;
    let col = 0;
    const currentDiagonal = [];
    while (row < MAP_SIZE && col < MAP_SIZE) {
      const coord = `${row}-${col}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentDiagonal.push(element);
      }
      row++;
      col++;
    }
    if (currentDiagonal.length == MAP_SIZE - k) {
      diagonalCoords.push(currentDiagonal);
    }
  }
  //console.log("diagonalCoordinates", diagonalCoords);
  return diagonalCoords;
}

export function rowCoordinates(mapFrames: string[]) {
  const rowCoords = [];

  for (let i = 0; i < MAP_SIZE; i++) {
    const currentRow = [];
    for (let j = 0; j < MAP_SIZE; j++) {
      const coord = `${i}-${j}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentRow.push(element);
      }
    }
    if (currentRow.length > 0) {
      rowCoords.push(currentRow);
    }
  }
  //console.log("rowCoordinates", rowCoords);
  return rowCoords;
}

export function columnCoordinates(mapFrames: string[]) {
  const colCoords = [];

  for (let j = 0; j < MAP_SIZE; j++) {
    const currentCol = [];
    for (let i = 0; i < MAP_SIZE; i++) {
      const coord = `${i}-${j}`;
      const element = mapFrames.find((el) => el == coord);
      if (element) {
        currentCol.push(element);
      }
    }
    if (currentCol.length > 0) {
      colCoords.push(currentCol);
    }
  }
  //console.log("columnCoordinates", colCoords);
  return colCoords;
}

export function findLargestSquare(elements: string[]) {
  const square = new Array(MAP_SIZE).fill(null).map(() => new Array(MAP_SIZE).fill(null));

  let largestSquareSize = 0;
  let largestSquareStartRow = -1;
  let largestSquareStartCol = -1;

  for (let element of elements) {
    const [x, y] = getCoords(element);
    if (x < MAP_SIZE && y < MAP_SIZE) {
      square[x][y] = element;
    }
  }

  for (let row = 0; row < MAP_SIZE; row++) {
    for (let col = 0; col < MAP_SIZE; col++) {
      if (square[row][col]) {
        let squareSize = 1;
        while (row + squareSize < MAP_SIZE && col + squareSize < MAP_SIZE) {
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
    start: `${largestSquareStartRow}-${largestSquareStartCol}`,
  };
  //console.log("findLargestSquare", res);
  return res;
}

export function findClusters(coordinates: string[]) {
  let points = [...coordinates];

  const euclideanDistance = (point1: string, point2: string) => {
    const [x1, y1] = getCoords(point1);
    const [x2, y2] = getCoords(point2);
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
