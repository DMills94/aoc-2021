const fs = require("fs");

const fileToArray = (path, separator = "\n") => {
  return fs
    .readFileSync(path, "utf-8")
    .toString()
    .replace(/\r\n/g, "\n")
    .split(separator);
};

const exampleToArray = (string, separator = "\n") => {
  return string.replace(/\r\n/g, "\n").split(separator);
};

module.exports = { fileToArray, exampleToArray };