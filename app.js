import { handleCommand, printError, printSuccess } from "./commands/commandHandler.js";
import { handleFileAction } from "./services/contactService.js";

const main = () => {
  const [, , command, ...args] = process.argv;

  const { isValid, message } = handleCommand(command, args);
  if (isValid) {
    const commandResult = handleFileAction(command, args);
    if (commandResult?.result) {
      printSuccess(commandResult);
      return;
    } else printError(commandResult.message);
  } else printError(message);
  return;
};

main();
