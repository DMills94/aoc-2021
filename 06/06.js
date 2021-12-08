const { exampleToArray, fileToArray } = require("../input-parser");

const example = `3,4,3,1,2`;

// const input = exampleToArray(example, ",").map((val) => +val);
const input = fileToArray("./06.txt", ",").map(val => +val);

// Part 1
const startingAges = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

// Process input
input.forEach((number) => (startingAges[number] += 1));

const simulateDays = (ages, maxDays, currentDay = 0) => {
  if (currentDay === maxDays) return Object.values(ages).reduce((a, b) => a + b, 0);
    
  const newAges = {};

  newAges[0] = ages[1];
  newAges[1] = ages[2];
  newAges[2] = ages[3];
  newAges[3] = ages[4];
  newAges[4] = ages[5];
  newAges[5] = ages[6];
  newAges[6] = ages[0] + ages[7];
  newAges[7] = ages[8];
  newAges[8] = ages[0];
  
  return simulateDays(newAges, maxDays, currentDay + 1);
};

console.log(
  `P1: After 80 days there are ${simulateDays(startingAges, 80)} lanternfish`
);
console.log(
  `P2: After 256 days there are ${simulateDays(startingAges, 256)} lanternfish`
);
