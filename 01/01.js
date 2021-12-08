const { exampleToArray, fileToArray } = require("../input-parser");

const example = `199
200
208
210
200
207
240
269
260
263`;

// const input = exampleToArray(example);
const input = fileToArray("./01.txt");

// Part 1
let increasesP1 = 0;

input.forEach((val, i) => {
  if (+val > +input[i - 1]) increasesP1++;
});

console.log(`1: The depth increases ${increasesP1} times`);

// Part 2
let prev3,
  increasesP2 = 0;

input.forEach((val, i) => {
  const a = +val,
    b = +input[i + 1],
    c = +input[i + 2];

  if (!b || !c) return;

  const sum = a + b + c;
  if (sum > prev3) increasesP2++;
  prev3 = sum;
});

console.log(`2: The trio of depths increases ${increasesP2} times`);
