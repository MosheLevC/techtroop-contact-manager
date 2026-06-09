import { log } from "node:console";
import { handleCommand, printError, printSuccess } from "./commands/commandHandler.js";
import { handleFileAction } from "./services/contactService.js";

const main = () => {
  const [, , command, ...args] = process.argv;

  const commandResult = handleCommand(command, args);

  if (commandResult.shouldExit) {
    console.log("\n");
    return;
  }

  const { isValid, message } = commandResult;
  if (isValid) {
    console.log("Loading contacts from contacts.json...");

    const { success, messageArr, data } = handleFileAction(command, args);
    if (success) {
      printSuccess(messageArr, data);
    } else printError(messageArr);
  } else printError(message);
  console.log("\n")
  return;
};

main();
