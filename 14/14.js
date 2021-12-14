const { exampleToArray, fileToArray } = require("../input-parser");

const example = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

// let [template, input] = exampleToArray(example, "\n\n");
let [template, input] = fileToArray("./14.txt", "\n\n");

let strings = {};
for (let k = 0; k < template.length; k++) {
  const pair = `${template[k]}${template[k+1] || ""}`;
  strings[pair] = strings[pair] ? strings[pair]+ 1 : 1;
};

const rules = {}
input.split("\n").forEach(rule => {
  const [pair, insert] = rule.split(" -> ");
  rules[pair] = insert;
})

const step = stringsObj => {
  for (let [pair, times] of Object.entries(stringsObj)) {
    const insertChar = rules[pair];
    if (insertChar) {
      stringsObj[pair] = stringsObj[pair] -= times;
      const firstPair = `${pair[0]}${insertChar}`;
      const secondPair = `${insertChar}${pair[1]}`;
      stringsObj[firstPair] = stringsObj[firstPair]  + times || times;
      stringsObj[secondPair] = stringsObj[secondPair] + times || times;
    }
  }
  return stringsObj = Object.fromEntries(Object.entries(stringsObj).filter(([_, v]) => v != 0));
}

const maxMinusMin = (stringsObj) => {
  const charNums = {};
  Object.entries(stringsObj).forEach(([pair, times]) => {
    const first = pair.split("")[0];
    charNums[first] = charNums[first] + times || times;
  });

  return Math.max(...Object.values(charNums)) - Math.min(...Object.values(charNums));
};

// Part 1

const P1_STEPS = 10;
let p1Strings = {...strings};
for (j = 0; j < P1_STEPS; j++) {
  p1Strings = step(p1Strings);
}

console.log(`P1: The most frequent char - least frequent char is ${maxMinusMin(p1Strings)}`);

// Part 2

const P2_STEPS = 40;
let p2Strings = {...strings};
for (let l = 0; l < P2_STEPS; l++) {
  p2Strings = step(p2Strings);
}

console.log(`P2: The most frequent char - least frequent char is ${maxMinusMin(p2Strings)}`);