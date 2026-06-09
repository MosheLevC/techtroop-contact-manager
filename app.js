import { log } from "node:console";
import { handleCommand, printError, printSuccess } from "./commands/commandHandler.js";
import { handleFileAction } from "./services/contactService.js";

const main = () => {
  const [, , command, ...args] = process.argv;

  const { isValid, message } = handleCommand(command, args);
  if (isValid) {
    console.log("Loading contacts from contacts.json...");

    const { success, messageArr, data } = handleFileAction(command, args);
    if (success) {
      printSuccess(messageArr, data);
    } else printError(messageArr[0]);
  } else printError(message);
  console.log("\n")
  return;
};

main();
