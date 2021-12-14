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

const rules = {}
input.split("\n").forEach(rule => {
  const [pair, insert] = rule.split(" -> ");
  rules[pair] = insert;
})

// Part 1
const step = () => {
  let updatedTempate = "";

  for (i = 0; i < p1String.length; i++) {
    const firstChar = p1String[i];
    const secondChar = p1String[i + 1] || "";
    const chars = firstChar + secondChar;

    if (chars.length === 1) updatedTempate += chars;
    else {
      if (rules[chars]) updatedTempate += firstChar + rules[chars];
      else updatedTempate += firstChar;
    }
  }

  p1String = updatedTempate;
};

const P1_STEPS = 10;
let p1String = template;
for (j = 0; j < P1_STEPS; j++) {
  step();
}

const charCounts = {};
p1String.split("").forEach(char => {
  charCounts[char] = charCounts[char] ? charCounts[char] + 1 : 1;
})

const [max, min] = [Math.max(...Object.values(charCounts)), Math.min(...Object.values(charCounts))];

console.log(`P1: The most frequent char - least frequent char is ${max - min}`);

// Part 2
let strings = {};
for (let k = 0; k < template.length; k++) {
  const pair = `${template[k]}${template[k+1] || ""}`;
  strings[pair] = strings[pair] ? strings[pair]+ 1 : 1;
};

const stepP2 = () => {
  for (let [pair, times] of Object.entries(strings)) {
    if (pair.length === 1) continue;

    const insertChar = rules[pair];
    if (insertChar) {
      strings[pair] = strings[pair] -= times;
      const firstPair = `${pair[0]}${insertChar}`;
      const secondPair = `${insertChar}${pair[1]}`;
      strings[firstPair] = strings[firstPair]  + times || times;
      strings[secondPair] = strings[secondPair] + times || times;
    }
  }
  strings = Object.fromEntries(Object.entries(strings).filter(([_, v]) => v != 0));
}

const P2_STEPS = 40;
for (let l = 0; l < P2_STEPS; l++) {
  stepP2();
}

const charNums = {};
Object.entries(strings).forEach(([pair, times]) => {
  const first = pair.split("")[0];
  charNums[first] = charNums[first] + times || times;
})

const [max2, min2] = [Math.max(...Object.values(charNums)), Math.min(...Object.values(charNums))];

console.log(`P2: The most frequent char - least frequent char is ${max2 - min2}`);