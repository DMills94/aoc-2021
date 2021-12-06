const fs = require("fs");

const txtToArray = (path, separator = "\n") => {
  return fs
    .readFileSync(path, "utf-8")
    .toString()
    .replace(/\r\n/g, "\n")
    .split(separator);
};

const stringToArray = (string, separator = "\n") => {
  return string.replace(/\r\n/g, "\n").split(separator);
};

module.exports = { txtToArray, stringToArray };