const { exampleToArray, fileToArray } = require("../inputHelper");

const example = `16,1,2,0,4,2,7,1,2,14`;

// const input = exampleToArray(example, ",").map((val) => +val);
const input = fileToArray("./07.txt", ",").map(val => +val);

// Part 1
const min = Math.min(...input);
const max = Math.max(...input)
let minFuel;

for (i = min; i < max; i++) {
  let fuelUsage = 0;
  input.forEach(position => {
    fuelUsage += Math.abs(position - i);
  })

  if (!minFuel || fuelUsage < minFuel) minFuel = fuelUsage;
}

console.log(`P1: The minimum fuel required to align the crabs is ${minFuel}`);

// Part 2
minFuel = undefined;

for (i = min; i < max; i++) {
  let fuelUsage = 0;
  input.forEach(position => {
    const distance = Math.abs(position - i)
    fuelUsage += distance * (distance + 1) / 2;
  })

  if (!minFuel || fuelUsage < minFuel) minFuel = fuelUsage;
}

console.log(`P2: The minimum fuel required to align the crabs is ${minFuel}`);


