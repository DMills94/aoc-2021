const { exampleToArray, fileToArray } = require("../input-parser");

const example = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

// const input = exampleToArray(example).filter(Boolean);
const input = fileToArray("./04.txt").filter(Boolean);

// Part 1
const bingoNumbers = input.shift().split(",");
const boards = [];

const processRow = (string) => string.trim().replace(/\s+/g, ",").split(",");

for (i = 0; i < input.length; i += 5) {
  boards.push([
    processRow(input[i]),
    processRow(input[i + 1]),
    processRow(input[i + 2]),
    processRow(input[i + 3]),
    processRow(input[i + 4]),
  ]);
}

let isBingo = false;
let numbersIndex = 0;

const checkIsBingo = (array) => array.every((val) => val === "hit!");

const playBingo = (boards) => {
  const activeNumber = bingoNumbers[numbersIndex];

  if (!activeNumber) throw new Error("Game concluded without a winner");
  boards.forEach((bingoBoard, boardIndex) => {
    bingoBoard.forEach((boardRow, i) => {
      boardRow.forEach((boardNumber, j) => {
        if (activeNumber === boardNumber) {
          // Hit
          boards[boardIndex][i][j] = "hit!";
        }
      });
    });

    // Check for ROW / COL bingo
    let columns = {};
    bingoBoard.forEach((boardRow) => {
      // Row
      if (checkIsBingo(boardRow)) {
        isBingo = {
          bingoBoard,
          number: activeNumber,
        };
        return;
      }

      // Columns
      boardRow.forEach((number, colNum) => {
        const existingNumbers = columns[colNum] || [];
        columns[colNum] = [...existingNumbers, number];
      });
    });

    Object.values(columns).forEach((column) => {
      if (checkIsBingo(column)) {
        isBingo = {
          bingoBoard,
          number: activeNumber,
        };
        return;
      }
    });
  });
}

const boardsCopy = [...boards]
while (!isBingo) {
  playBingo(boardsCopy);
  numbersIndex++;
}

const winningBoard = isBingo.bingoBoard;
const finalNumber = isBingo.number;
const sumOfUnmarked = winningBoard
  .flat()
  .filter((val) => val !== "hit!")
  .reduce((prev, cur) => +prev + +cur);

console.log(
  `P1: Sum of unmarked (${sumOfUnmarked}) * finalNumber (${finalNumber}) = ${
    sumOfUnmarked * finalNumber
  }`
);

// Part 2
let stillLosers = true;
numbersIndex = 0;
const boardStatuses = new Array(boards.length).fill(false);
let finalBingo;

const boardsCopy2 = [...boards];
while (stillLosers) {
  playBingo(boardsCopy2);
  
  boardsCopy2.forEach((board, boardIndex) => {
    let columns = {};
    board.forEach(boardRow => {
      if (checkIsBingo(boardRow)) {
        boardStatuses[boardIndex] = true; // has bingo
      }

      // Columns
      boardRow.forEach((number, colNum) => {
        const existingNumbers = columns[colNum] || [];
        columns[colNum] = [...existingNumbers, number];
      });
    })

    Object.values(columns).forEach((column) => {
      if (checkIsBingo(column)) boardStatuses[boardIndex] = true;
    });

    if (boardStatuses.every(status => status === true)) {
      if (stillLosers) {
        stillLosers = false;
        finalBingo = {
          board,
          number: bingoNumbers[numbersIndex]
        }
      }
    }
  })
  
  numbersIndex++;
}

const losingBoard = finalBingo.board;
const finalNumber2 = finalBingo.number;
const sumOfUnmarked2 = losingBoard
  .flat()
  .filter((val) => val !== "hit!")
  .reduce((prev, cur) => +prev + +cur);

console.log(
  `P2: Sum of unmarked (${sumOfUnmarked2}) * finalNumber (${finalNumber2}) = ${
    sumOfUnmarked2 * finalNumber2
  }`
);