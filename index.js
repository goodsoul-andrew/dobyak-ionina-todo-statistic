const { getAllFilePathsWithExtension, readFile } = require("./fileSystem");
const { readLine } = require("./console");

const files = getFiles();
const filesTodoRaw = files.map((file) => {
  return file.match(/\/\/ TODO\s+.*\n/g) || [];
});
const filesTodo = filesTodoRaw.map(arr => arr.map((el) => el.slice(8, el.length - 1)));

console.log("Please, write your command!");
readLine(processCommand);

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), "js");
  return filePaths.map((path) => readFile(path));
}

function processCommand(command) {
  switch (command) {
    case "exit":
      process.exit(0);
      break;
    case "show":
        console.log('show');
        for (const file of filesTodo) {
            console.log(file);
            for (const line of file) {
                console.log(line);
            }
        }
        
        break
    case "important":
        for (const file of filesTodo) {
            for (const line of file.filter(l => l.includes('!'))) {
                console.log(line);
            }
        }
    default:
      console.log("wrong command");
      break;
  }
}

// TODO you can do it!
