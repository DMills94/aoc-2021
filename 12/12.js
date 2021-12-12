const { exampleToArray, fileToArray } = require("../input-parser");

const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const bigExample = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const largeExample = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

// const input = exampleToArray(example);
// const input = exampleToArray(bigExample);
// const input = exampleToArray(largeExample);
const input = fileToArray("./12.txt");

const isSmallCave = (str) => str === str.toLowerCase();

// Part 1
const mappedInput = {};
input.forEach((line) => {
  const [cave, attachedCave] = line.split("-");
  mappedInput[cave] = [...(mappedInput[cave] || []), attachedCave];
  mappedInput[attachedCave] = [...(mappedInput[attachedCave] || []), cave];
});

const calculatePossibleRoutes = (startingPoint = "start", partialRoute = [], visitedSmallCaves = new Set()) => {
  const updatedRoute = [...partialRoute, startingPoint]; // Add the new starting point
  const updatedSmallCaves = new Set(visitedSmallCaves);
  isSmallCave(startingPoint) && updatedSmallCaves.add(startingPoint);
  if (startingPoint === "end") return allRoutes.push(updatedRoute); // If the starting point is "end" we can finish the route

  const possibleRoutes = mappedInput[startingPoint];
  for (let cave of possibleRoutes) {
    if (updatedSmallCaves.has(cave)) continue;
    calculatePossibleRoutes(cave, updatedRoute, updatedSmallCaves);
  }
};

const allRoutes = [];
calculatePossibleRoutes();
console.log(`P1: The total number of possible routes is ${allRoutes.length}`);
