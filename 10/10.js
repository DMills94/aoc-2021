const { exampleToArray, fileToArray } = require("../input-parser");

const example = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

// const input = exampleToArray(example).map((line) => line.split(""));
const input = fileToArray("./10.txt").map((line) => line.split(""));

// Part 1
const OPEN_CHARS = ["(", "[", "{", "<"];
const CLOSE_CHARS = [")", "]", "}", ">"];
const INVALID_CHAR_POINTS = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const firstIncorrectChars = [];
const corruptLines = [];

const processLine = (line) => {
  const openCharOrder = [];
  for (const char of line) {
    if (OPEN_CHARS.includes(char)) openCharOrder.push(char);
    else {
      const closeCharIndex = CLOSE_CHARS.indexOf(char);
      const relatedOpenChar = OPEN_CHARS[closeCharIndex];
      const lastOpenChar = openCharOrder[openCharOrder.length - 1];

      if (lastOpenChar === relatedOpenChar) openCharOrder.pop();
      else
        return {
          openCharOrder,
          invalidChar: char,
        };
    }
  }

  return openCharOrder;
};

input.forEach((line, i) => {
  const invalidChar = processLine(line);
  if (invalidChar.invalidChar) {
    firstIncorrectChars.push(invalidChar.invalidChar);
    corruptLines.push(i);
  }
});

const points = firstIncorrectChars.reduce(
  (sum, char) => sum + INVALID_CHAR_POINTS[char],
  0
);

console.log(`P1: The point sum for incorrect chars is ${points}`);

// Part 2
const incompleteInputLines = input.filter((_, i) => !corruptLines.includes(i));

const COMPLETION_CHAR_POINTS = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const incompleteLinePoints = [];

for (const line of incompleteInputLines) {
  const openChars = processLine(line);
  const closeOrder = openChars.reverse().map((char) => {
    const openIndex = OPEN_CHARS.indexOf(char);
    return CLOSE_CHARS[openIndex];
  });

  const completionPoints = closeOrder.reduce(
    (sum, char) => sum * 5 + COMPLETION_CHAR_POINTS[char],
    0
  );
  incompleteLinePoints.push(completionPoints);
}

const sortedCompletionScores = incompleteLinePoints.sort((a, b) => a - b);

console.log(
  `P2: The middle incomplete line completion score is ${
    sortedCompletionScores[Math.floor(sortedCompletionScores.length / 2)]
  }`
);
