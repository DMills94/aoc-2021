const { exampleToArray, fileToArray } = require("../input-parser");

const example = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// const input = exampleToArray(example).map((line) => line.split(""));
const input = fileToArray("./09.txt").map((line) => line.split(""));

// Part 1
const getAdajacentValues = (row, col, returnCoords) => {
  const top = input[row - 1] ? input[row - 1][col] : Number.MAX_SAFE_INTEGER;
  const right = input[row][col + 1] ? input[row][col + 1] : Number.MAX_SAFE_INTEGER;
  const bottom = input[row + 1] ? input[row + 1][col] : Number.MAX_SAFE_INTEGER;
  const left = input[row][col - 1] ? input[row][col - 1] : Number.MAX_SAFE_INTEGER;
  return returnCoords
    ? [
        { coord: [row - 1, col], height: +top },
        { coord: [row, col + 1], height: +right },
        { coord: [row + 1, col], height: +bottom },
        { coord: [row, col - 1], height: +left },
      ]
    : [top, right, bottom, left];
};

const lowPoints = [];

for (i = 0; i < input.length; i++) {
  for (j = 0; j < input[i].length; j++) {
    const height = input[i][j];
    const neighbours = getAdajacentValues(i, j);

    if (height < Math.min(...neighbours)) {
      lowPoints.push({ height: +height, coordinates: [i, j] });
    }
  }
}

console.log(`P1: Sum of risk factors for ${lowPoints.length} low points is ${lowPoints.reduce((a, b) => a + b.height + 1, 0)}`);

// Part 2
const checkForBasinNeighbours = (x, y) => {
  const neighbours = getAdajacentValues(x, y, true);

  return neighbours.filter((neighbour) => neighbour.height < 9).map((neighbour) => neighbour.coord);
};

const lowPointsCoords = lowPoints.map((lowPoint) => lowPoint.coordinates);
const basinSizes = [];

lowPointsCoords.forEach(([x, y]) => {
  const basinCoords = new Set();
  basinCoords.add(`${x},${y}`);

  let neighboursToCheck = checkForBasinNeighbours(x, y);

  while (neighboursToCheck.length) {
    const newNeighbours = [];

    neighboursToCheck.forEach(([x, y], i) => {
      if (!basinCoords.has(`${x},${y}`)) {
        basinCoords.add(`${x},${y}`);
      }
      checkForBasinNeighbours(x, y)
        .filter(([x, y]) => !basinCoords.has(`${x},${y}`))
        .forEach((coord) => newNeighbours.push(coord));
    });

    neighboursToCheck = newNeighbours;
  }

  basinSizes.push(basinCoords.size);
});

const largest3Basins = basinSizes.sort((a, b) => a - b).splice(-3);

console.log(
  `P2: There are ${lowPoints.length} basins, which the product of the largest 3 being ${largest3Basins.reduce(
    (a, b) => a * b
  )}`
);
