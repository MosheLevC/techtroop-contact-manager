import { handleCommand, printError, printSuccess } from "./commands/commandHandler.js";
import { handleFileAction } from "./services/contactService.js";

const main = () => {
  const [, , command, ...args] = process.argv;

  const { isValid, message } = handleCommand(command, args);
  if (isValid) {
    console.log("Loading contacts from contacts.json...");

    const { success, message, data } = handleFileAction(command, args);
    if (success) {
      printSuccess(message, data);
    } else printError(message);
  } else printError(message);
  return;
};

main();
