const { exampleToArray, fileToArray } = require("../input-parser");

const example = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

// const input = exampleToArray(example);
const input = fileToArray("./08.txt");

// Part 1
const UNIQUE_DIGIT_SIGNAL_LENGTHS = [2, 3, 4, 7];

let uniqueNumbers = 0;
input.forEach((line) => {
  const outSignals = line.split(" | ")[1].split(" ");
  outSignals.forEach((signal) => UNIQUE_DIGIT_SIGNAL_LENGTHS.includes(signal.length) && uniqueNumbers++);
});

console.log(`P1: There are ${uniqueNumbers} unique signal codes in all the outputs`);

// Part 2
let outputSum = 0;

const digitsTemplate = {
  0: { length: 6, possibleSignals: [] },
  1: { length: 2, possibleSignals: [] },
  2: { length: 5, possibleSignals: [] },
  3: { length: 5, possibleSignals: [] },
  4: { length: 4, possibleSignals: [] },
  5: { length: 5, possibleSignals: [] },
  6: { length: 6, possibleSignals: [] },
  7: { length: 3, possibleSignals: [] },
  8: { length: 7, possibleSignals: [] },
  9: { length: 6, possibleSignals: [] },
};

/**
 *   000
 *  1   2
 *   333
 *  4   5
 *   666
 */
const segmentsTemplate = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
};

const sortString = (string) =>
  string
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");

const findStringDiff = (str1, str2) => {
  const str1Arr = str1.split("");
  const str2Arr = str2.split("");

  return str1Arr.filter((x) => !str2Arr.includes(x));
};

const findStringMatch = (str1, str2) => {
  const str1Arr = str1.split("");
  const str2Arr = str2.split("");

  return str1Arr.filter((x) => str2Arr.includes(x));
};

input.forEach((line) => {
  const digits = {
    0: { length: 6, possibleSignals: [] },
    1: { length: 2, possibleSignals: [] },
    2: { length: 5, possibleSignals: [] },
    3: { length: 5, possibleSignals: [] },
    4: { length: 4, possibleSignals: [] },
    5: { length: 5, possibleSignals: [] },
    6: { length: 6, possibleSignals: [] },
    7: { length: 3, possibleSignals: [] },
    8: { length: 7, possibleSignals: [] },
    9: { length: 6, possibleSignals: [] },
  };
  const segments = {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
  };

  const inSignals = line.split(" | ")[0].split(" ");
  const outSignals = line.split(" | ")[1].split(" ");

  inSignals.forEach((signal) => {
    const signalLength = signal.length;

    Object.values(digits).forEach((digit, i) => {
      if (digit.length === signalLength) digits[i].possibleSignals.push(sortString(signal));
    });
  });

  const ALL_SEGMENTS = "abcdefg";
  segments[0] = findStringDiff(digits[7].possibleSignals[0], digits[1].possibleSignals[0]);
  segments[1] = findStringDiff(digits[4].possibleSignals[0], digits[1].possibleSignals[0]);
  segments[2] = digits[1].possibleSignals[0].split("");
  segments[3] = findStringDiff(digits[4].possibleSignals[0], digits[1].possibleSignals[0]);
  segments[5] = digits[1].possibleSignals[0].split("");

  const usedSegments = [...new Set(Object.values(segments).flat().filter(Boolean))].join("");

  segments[4] = findStringDiff(ALL_SEGMENTS, usedSegments);
  segments[6] = findStringDiff(ALL_SEGMENTS, usedSegments);

  // Number 2 (Segments 0 2 3 4 6) has 0 + 46 (which are the same possible pair) can deduce 2 and 3
  digits[2].possibleSignals = digits[2].possibleSignals.filter((possibility) => {
    let matches = true;
    const matchers = [segments[0], ...segments[4]].flat();
    matchers.forEach((segment) => {
      if (!possibility.includes(segment)) matches = false;
    });
    return matches;
  });

  segments[2] = findStringMatch(digits[2].possibleSignals[0], digits[1].possibleSignals[0]);
  segments[3] = findStringMatch(
    digits[2].possibleSignals[0],
    findStringDiff(digits[4].possibleSignals[0], digits[1].possibleSignals[0]).join("")
  );
  segments[1] = findStringDiff(segments[1].join(""), segments[3][0]);
  segments[5] = findStringDiff(segments[5].join(""), segments[2][0]);

  // Number 3 (Segments 0 2 3 5 6) only has unknown 6 now
  digits[3].possibleSignals = digits[3].possibleSignals.filter((possibility) => {
    let matches = true;
    const matchers = [segments[0], segments[2], segments[3], segments[5]];

    matchers.forEach((segment) => {
      if (!possibility.includes(segment)) matches = false;
    });
    return matches;
  });

  segments[6] = findStringMatch(segments[6].join(""), digits[3].possibleSignals[0]);
  segments[4] = findStringDiff(segments[4].join(""), digits[3].possibleSignals[0]);

  // Work out correct signals
  digits[5].possibleSignals = digits[5].possibleSignals.filter(
    (possibility) => ![digits[2].possibleSignals[0], digits[3].possibleSignals[0]].includes(possibility)
  );

  digits[0].possibleSignals = digits[0].possibleSignals.filter((possibility) => !possibility.includes(segments[3]));
  digits[6].possibleSignals = digits[6].possibleSignals.filter((possibility) => !possibility.includes(segments[2]));
  digits[9].possibleSignals = digits[9].possibleSignals.filter((possibility) => !possibility.includes(segments[4]));

  let output = "";
  outSignals.forEach((signal) => {
    const sortedSignal = sortString(signal);
    const signalValue = Object.values(digits)
      .map((digit) => digit.possibleSignals[0])
      .indexOf(sortedSignal);
    output += signalValue;
  });

  outputSum += +output;
});

console.log(`P2: The sum of outputs is ${outputSum}`);
