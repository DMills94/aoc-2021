const { exampleToArray, fileToArray } = require("../input-parser");

const example = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

// const input = exampleToArray(example);
const input = fileToArray("./03.txt");

// Part 1
let gamma = "",
  epsilon = "";

const mostFrequentValue = (array, index) => {
  let zeroes = 0,
    ones = 0;

  array.forEach(bin => {
    const intToCheck = +bin[index];
    intToCheck > 0 ? ones++ : zeroes++;
  });

  return ones >= zeroes ? "1" : "0";
};

const leastFrequentValue = (array, index) => {
  let zeroes = 0,
    ones = 0;

  array.forEach((bin) => {
    const intToCheck = +bin[index];
    intToCheck > 0 ? ones++ : zeroes++;
  });

  return ones >= zeroes ? "0" : "1";
};

for (i = 0; i < input[0].length; i++) {
  let zeroes = 0,
    ones = 0;

  input.forEach((bin) => {
    const intToCheck = +bin[i];
    intToCheck > 0 ? ones++ : zeroes++;
  });

  gamma = gamma.concat(mostFrequentValue(input, i));
  epsilon = epsilon.concat(leastFrequentValue(input, i));
}

const decGamma = parseInt(gamma, 2);
const decEpsilon = parseInt(epsilon, 2);

console.log(`P1: Gamma * Epsilon = ${decGamma * decEpsilon}`);

// Part 2
const filterForOxygenRating = (arr, index) => {
  let checkValue = mostFrequentValue(arr, index);

  return arr.filter((bin) => bin[index] === checkValue);
};

let index = 0;
let oxygenValues = [...input];
while (oxygenValues.length > 1) {
  oxygenValues = filterForOxygenRating(oxygenValues, index);
  index++;
}

const filterForCO2Rating = (arr, index) => {
  let checkValue = leastFrequentValue(arr, index);

  return arr.filter((bin) => bin[index] === checkValue);
};

index = 0;
let co2Values = [...input];
while (co2Values.length > 1) {
  co2Values = filterForCO2Rating(co2Values, index);
  index++;
}

const decOxygen = parseInt(oxygenValues[0], 2);
const decCO2 = parseInt(co2Values[0], 2)

console.log(`P2: Oxygen * CO2 = ${decOxygen * decCO2}`);