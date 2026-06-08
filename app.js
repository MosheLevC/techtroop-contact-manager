import { handleValidation } from "./commands/commandHandler.js";

const [, , command, ...args] = process.argv;

const main = () => {
  if (handleValidation(command, args)) {
    console.log("noice");
  } else console.log("bad input");
};

main();
