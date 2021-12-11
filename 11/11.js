const { exampleToArray, fileToArray } = require("../input-parser");

const example = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const smolExample = `11111
19991
19191
19991
11111`;

const formatFlashes = (arr) => arr.join("").replace(/(.{10})/g, "$1\n");
const formatEnergies = (arr) => `\n${formatFlashes(arr.map((val) => (val > 9 ? 0 : val)))}`;

// const input = exampleToArray(smolExample).map((line) => line.split("")).flat();
// const input = exampleToArray(example).map((line) => line.split("")).flat();
const input = fileToArray("./11.txt").map((line) => line.split("")).flat();

// Part 1
const increaseAdjacents = (array, i) => {
  const ROW_LENGTH = 10;
  array[i - ROW_LENGTH] >= 0 && array[i - ROW_LENGTH]++; //Top
  array[i + ROW_LENGTH] >= 0 && array[i + ROW_LENGTH]++; //Bottom
  if (!(i % 10 === 9)) {
    array[i - ROW_LENGTH + 1] >= 0 && array[i - ROW_LENGTH + 1]++; //TopRight
    array[i + 1] >= 0 && array[i + 1]++; //Right
    array[i + ROW_LENGTH + 1] >= 0 && array[i + ROW_LENGTH + 1]++; //BottomRight
  }
  if (!(i % 10 === 0)) {
    array[i + ROW_LENGTH - 1] >= 0 && array[i + ROW_LENGTH - 1]++; //BottomLeft
    array[i - 1] >= 0 && array[i - 1]++; //Left
    array[i - ROW_LENGTH - 1] >= 0 && array[i - ROW_LENGTH - 1]++; //TopLeft
  }

  return array;
};

const processFlashes = (array, flashMap) => {
  let flashOccurs = false;
  const arrayCopy = [...array];
  let newArray = [...arrayCopy];
  const existingFlashes = flashMap || new Array(arrayCopy.length).fill(".");

  for (let [i, energy] of arrayCopy.entries()) {
    if (energy > 9 && existingFlashes[i] !== "*") {
      newArray = increaseAdjacents(newArray, i);
      existingFlashes[i] = "*";
      flashOccurs = true;
    }
  }

  if (flashOccurs) return processFlashes(newArray, existingFlashes);
  else {
    const totalFlashes = existingFlashes.filter((char) => char === "*").length;
    return [newArray, totalFlashes];
  }
};

const step = (octopuses) => {
  // Increase energy by 1
  const energisedOctopuses = octopuses.map((energy) => +energy + 1);

  // Process flashes
  const [flashedOctopuses, flashes] = processFlashes(energisedOctopuses);

  // Reset flashed
  const finalOctopuses = flashedOctopuses.map((energy) => (energy > 9 ? 0 : energy));

  return {
    finalOctopuses,
    flashes,
  };
};

const steps = 100;
let totalFlashes = 0;
let octopusMap = [...input];

for (let i = 0; i < steps; i++) {
  const { finalOctopuses, flashes } = step(octopusMap);
  totalFlashes += flashes;
  octopusMap = finalOctopuses;
}

console.log(formatEnergies(octopusMap));
console.log(`P1: After ${steps} steps, there was a total of ${totalFlashes} flashes`);

// Part 2
let stepNum = 1;
let syncronisedMap = [...input];
let isSycnronised = false;

while (!isSycnronised) {
  const { finalOctopuses } = step(syncronisedMap);
  syncronisedMap = finalOctopuses;
  isSycnronised = syncronisedMap.every((energy) => energy === 0);
  if (!isSycnronised) stepNum++;
}

console.log(`P2: The octopuses synchronised after ${stepNum} steps!`);
