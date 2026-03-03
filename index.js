const { getAllFilePathsWithExtension, readFile } = require("./fileSystem");
const { readLine } = require("./console");

const files = getFiles();
const filesTodoRaw = files.map((file) => {
  return file.match(/\/\/ TODO\s+.*\n/g) || [];
});
const filesTodo = filesTodoRaw.map((arr) =>
  arr.map((el) => el.slice(8, el.length - 1))
);

console.log("Please, write your command!");
readLine(processCommand);

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), "js");
  return filePaths.map((path) => readFile(path));
}

function processCommand(command) {
  if (command === "exit") {
    process.exit(0);
  } else if (command === "show") {
    for (const file of filesTodo) {
      for (const line of file) {
        console.log(line);
      }
    }
  } else if (command === "important") {
    for (const file of filesTodo) {
      for (const line of file.filter((l) => l.includes("!"))) {
        console.log(line);
      }
    }
  } else if (command.startsWith('user')) {
    const name = command.slice(5);
    for (const file of filesTodo) {
      for (const line of file) {
        const pLine = parseLine(line);
        if (pLine && pLine[0] === name) {
            console.log(pLine[2]);
        }
      }
    }
  } else {
    console.log("wrong command");
  }
}

function parseLine(line) {
    const arr = line.split(';');
    return arr.length === 3 ? arr : null;
}

// TODO you can do it!
