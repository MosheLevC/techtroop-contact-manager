import { handleCommand } from "./commands/commandHandler.js";

const main = () => {
  const [, , command, ...args] = process.argv;

  const { isValid, message } = handleCommand(command, args);
  if (isValid) {
    console.log("noice");
  } else console.log(message);
};

main();
