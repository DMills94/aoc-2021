const { exampleToArray, fileToArray } = require("../inputHelper");
const { range } = require("lodash");

const example = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

// const input = exampleToArray(example);
const input = fileToArray("./05.txt");

// Part 1
let lines = [];

const strToCoords = (coords) => {
  const [x1, y1] = coords
    .split(" -> ")[0]
    .split(",")
    .map((str) => +str);
  const [x2, y2] = coords
    .split(" -> ")[1]
    .split(",")
    .map((str) => +str);
  return [x1, y1, x2, y2];
};

input
  .filter((coords) => {
    const [x1, y1, x2, y2] = strToCoords(coords);
    return x1 === x2 || y1 === y2;
  })
  .map((coords) => {
    const [x1, y1, x2, y2] = strToCoords(coords);
    return {
      x1,
      x2,
      y1,
      y2,
    };
  })
  .forEach(({ x1, x2, y1, y2 }) => {
    const lineCoordinates = [];

    for (i = 0; i < Math.abs(x2 - x1) + 1; i++) {
      for (j = 0; j < Math.abs(y2 - y1) + 1; j++) {
        lineCoordinates.push(
          `${x1 > x2 ? x1 - i : x1 + i}, ${y1 > y2 ? y1 - j : y1 + j}`
        );
      }
    }

    lines.push(lineCoordinates);
  });

const calculateOverlaps = (lines) => {
  let overlapCoords = new Set();
  while (lines.length) {
    const line = lines[0];
    for (const differentLine of lines) {
      if (line === differentLine) continue;

      line.forEach((coord) => {
        if (differentLine.includes(coord)) {
          overlapCoords.add(coord);
        }
      });
    }
    lines.shift();
  }
  return overlapCoords.size;
};

console.log(
  `P1: There are ${calculateOverlaps(lines)} coordinates with 1 or more overlap`
);

// Part 2
lines = [];
input
  .map((coords) => {
    const [x1, y1, x2, y2] = strToCoords(coords);
    return {
      x1,
      x2,
      y1,
      y2,
    };
  })
  .filter(({ x1, x2, y1, y2 }) => {
    return x1 === x2 || y1 === y2 || Math.abs(x2 - x1) === Math.abs(y2 - y1);
  })
  .forEach(({ x1, x2, y1, y2 }) => {
    const lineCoordinates = [];

    for (i = 0; i < Math.abs(x2 - x1) + 1; i++) {
      if (x2 - x1 === 0 || y2 - y1 === 0) {
        for (j = 0; j < Math.abs(y2 - y1) + 1; j++) {
          lineCoordinates.push(
            `${x1 > x2 ? x1 - i : x1 + i}, ${y1 > y2 ? y1 - j : y1 + j}`
          );
        }
      } else {
        lineCoordinates.push(
          `${x1 > x2 ? x1 - i : x1 + i}, ${y1 > y2 ? y1 - i : y1 + i}`
        );
      }
    }

    lines.push(lineCoordinates);
  });

console.log(
  `P2: There are ${calculateOverlaps(lines)} coordinates with 1 or more overlap`
);
