const { exampleToArray, fileToArray } = require("../input-parser");

const example = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

// const [x, y] = exampleToArray(example, "\n\n");
const [x, y] = fileToArray("./13.txt", "\n\n");

let coords = x.split("\n").map((coord) => [+coord.split(",")[0], +coord.split(",")[1]]);
const instructions = y
  .split("\n")
  .map((instr) => instr.split(" ").pop())
  .map((instr) => {
    const [coordinate, value] = instr.split("=");
    return [coordinate, +value];
  });

let dotsMap = new Set();

coords.forEach(([x, y]) => {
  dotsMap.add(`${x},${y}`);
});

const visualise = set => {
  const setArr = Array.from(set);
  const maxX = Math.max(...setArr.map(coord => +coord.split(",")[0] + 1));
  const maxY = Math.max(...setArr.map(coord => +coord.split(",")[1] + 1));
  const visualArr = new Array(maxX * maxY).fill(" ");
  setArr.forEach(coord => {
    const [x, y] = coord.split(",");
    visualArr[+x + maxX * +y] = "#";
  });
  const regex = new RegExp(`(.{${maxX}})`, "g");
  console.log(visualArr.join("").replace(regex, "$1\n"));
}

// Part 1
const fold = (instruction) => {
  const [foldCoord, foldNum] = instruction;

  for (let coord of dotsMap) {
    const [x, y] = coord.split(",");
    const foldingCoordinate = foldCoord === "x" ? +x : +y;
    if (foldingCoordinate <= foldNum) continue;
    else {
      const distanceToFold = foldingCoordinate - foldNum;
      const newX = foldCoord === "x" ? x - distanceToFold * 2 : x;
      const newY = foldCoord === "y" ? y - distanceToFold * 2 : y;
      const newCoord = `${newX},${newY}`;
      
      dotsMap.delete(coord);
      dotsMap.add(newCoord);
    }
  }
};

fold(instructions[0]);

console.log(`P1: Number of visible dots after 1 fold is ${dotsMap.size}`);

// Part2
dotsMap = new Set();

coords.forEach(([x, y]) => {
  dotsMap.add(`${x},${y}`);
});

for (let instruction of instructions) {
  fold(instruction);
}

console.log(`P2: CAUTION @@@ SUPER SECRET CODE BELOW @@@`);
visualise(dotsMap);