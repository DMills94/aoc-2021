const { exampleToArray, fileToArray } = require("../inputHelper");

const example = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

// const input = exampleToArray(example);
const input = fileToArray("./02.txt");

// Part 1
let horizontal = 0,
  depth = 0;

input.forEach((instruction) => {
  const [direction, distance] = instruction.split(" ");

  if (direction === "forward") horizontal += +distance;
  else if (direction === "up") depth -= +distance;
  else if (direction === "down") depth += +distance;
});

console.log(`P1: Horizontal * Depth is ${horizontal * depth}`);

// Part 2
let aim = 0;

horizontal = 0;
depth = 0;

input.forEach((instruction) => {
  const [direction, distance] = instruction.split(" ");

  if (direction === "forward") {
    horizontal += +distance;
    depth += +distance * aim;
  }
  else if (direction === "up") aim -= +distance;
  else if (direction === "down") aim += +distance;
});

console.log(`P2: Horizontal * Depth is ${horizontal * depth}`);