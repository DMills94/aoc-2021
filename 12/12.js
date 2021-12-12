const { exampleToArray, fileToArray } = require("../input-parser");

const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

// const input = exampleToArray(example);
const input = fileToArray("./12.txt");

const isSmallCave = (str) => str === str.toLowerCase();

// Part 1
const mappedInput = {};
input.forEach((line) => {
  const [cave, attachedCave] = line.split("-");
  mappedInput[cave] = [...(mappedInput[cave] || []), attachedCave];
  mappedInput[attachedCave] = [...(mappedInput[attachedCave] || []), cave];
});

const calculatePossibleRoutesP1 = (startingPoint = "start", partialRoute = [], visitedSmallCaves = new Set()) => {
  const updatedRoute = [...partialRoute, startingPoint]; // Add the new starting point
  const updatedSmallCaves = new Set(visitedSmallCaves);
  isSmallCave(startingPoint) && updatedSmallCaves.add(startingPoint);
  if (startingPoint === "end") return allP1Routes.push(updatedRoute); // If the starting point is "end" we can finish the route

  const possibleRoutes = mappedInput[startingPoint];
  for (let cave of possibleRoutes) {
    if (updatedSmallCaves.has(cave)) continue;
    calculatePossibleRoutesP1(cave, updatedRoute, updatedSmallCaves);
  }
};

const allP1Routes = [];
calculatePossibleRoutesP1();
console.log(`P1: The total number of possible routes is ${allP1Routes.length}`);

// Part 2
const calculatePossibleRoutesP2 = (startingPoint = "start", partialRoute = [], visitedSmallCaves = new Map()) => {
  const updatedRoute = [...partialRoute, startingPoint]; // Add the new starting point
  const updatedSmallCaves = new Map(visitedSmallCaves);
  isSmallCave(startingPoint) &&
    startingPoint !== "start" &&
    updatedSmallCaves.set(startingPoint, (updatedSmallCaves.get(startingPoint) || 0) + 1);
  if (startingPoint === "end") return allP2Routes.push(updatedRoute); // If the starting point is "end" we can finish the route

  const possibleRoutes = mappedInput[startingPoint];
  const existingDoubleVisit = Array.from(updatedSmallCaves.values()).find((visits) => visits >= 2);
  const maxVisits = existingDoubleVisit ? 1 : 2;
  for (let cave of possibleRoutes) {
    if (updatedSmallCaves.get(cave) >= maxVisits || cave === "start") continue;
    calculatePossibleRoutesP2(cave, updatedRoute, updatedSmallCaves);
  }
};

const allP2Routes = [];
calculatePossibleRoutesP2();
console.log(`P2: The total number of possible routes is ${allP2Routes.length}`);
