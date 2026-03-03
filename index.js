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
for (const file of filesTodo) {
      for (const line of file) {
        comm.push(parseLine(line));
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
        if (pLine.user === name) {
            console.log(pLine.comment);
        }
    }
  } else if (command.startsWith('sort')) {
    const arg = command.slice(5);
    if (arg === 'importance') {
        comm.sort((a, b) => {
            if (a.important === b.important) return 0;
            else if (a.important > b.important) return -1;
            else return 1;
        });

        for (const line of comm) {
            console.log(line.comment);
        }
    } else if (arg === 'user') {
        comm.sort((a, b) => {
            if (a.user === b.user) return 0;
            else if (a.user > b.user) return -1;
            else return 1;
        });

        for (const line of comm) {
            console.log(line.comment);
        }
    } else {
        comm.sort((a, b) => {
            if (a.date === b.date) return 0;
            else if (a.date > b.date) return -1;
            else return 1;
        });
        
        for (const line of comm) {
            console.log(line.comment);
        }
    }
  }
  else {
    console.log("wrong command");
  }
}

function count(str, c) {
    return str.split(c).length - 1;
}

function parseLine(line) {
    const arr = line.split(';');
    let user = arr[0].toLowerCase() ?? null
    if (arr.length !== 3) user = null;  
    return {
        user: user,
        date: arr[1] ? parseDate(arr[1]) : null,
        comment: line,
        important: count(line, "!")
    }
}

function parseDate(dateStr) {
    const parts = dateStr.split('-').map(Number);
    const year = parts[0];
    const month = parts[1] ? parts[1] - 1 : 0;
    const day = parts[2] ? parts[2] : 1;
    
    return new Date(year, month, day);
}

// TODO you can do it!
