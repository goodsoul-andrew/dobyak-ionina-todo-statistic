const { getAllFilePathsWithExtension, readFile } = require("./fileSystem");
const { readLine } = require("./console");

const files = getFiles();
const filesTodoRaw = files.map((file) => {
  return file.match(/\/\/ TODO\s+.*\n/g) || [];
});
const filesTodo = filesTodoRaw.map((arr) =>
  arr.map((el) => el.slice(8, el.length - 1))
);

const comm = []
const impComm = []
for (const file of filesTodo) {
      for (const line of file) {
        if (line.includes("!")) {
            impComm.push(line);
        } else {
            comm.push(line);
        }
    }
}

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
    for (const line of comm) {
        console.log(line);
    }
  } else if (command === "important") {
    for (const line of impComm) {
        console.log(line);
    }
  } else if (command.startsWith('user')) {
    const name = command.slice(5);
    for (const line of comm) {
        const pLine = parseLine(line);
        //console.log(pLine.user, pLine.user === name)
        if (pLine.user === name) {
            console.log(pLine.comment);
        }
    }
  } else {
    console.log("wrong command");
  }
}

function parseLine(line) {
    const arr = line.split(';');
    let user = arr[0].toLowerCase() ?? null
    if (arr.length !== 3) user = null;  
    return {
        user: user,
        date: arr[1] ?? null,
        comment: arr[2] ?? line,
        important: line.includes("!")
    }
}

// TODO you can do it!
