const fs = require("fs");

const fileToArray = (path, separator = "\n") => {
  const string = fs.readFileSync(path, "utf-8").toString();

  return separator ? string.replace(/\r\n/g, "\n").split(separator) : string;
};

const exampleToArray = (string, separator = "\n") => {
  if (!separator) return string;
  return string.replace(/\r\n/g, "\n").split(separator);
};

module.exports = { fileToArray, exampleToArray };
