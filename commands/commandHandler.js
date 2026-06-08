import { examples, printHelpCommandTable } from "../utils/misc.js";
import { validateCommand } from "../utils/validation.js";

export const handleCommand = (command, args) => {
  if (command !== "add" || command !== "list" || command !== "delete" || command !== "search") {
    if (command !== "help") {
      console.log(`no such command ${command}\n`);
    }
    printHelp();
  }
  return validateCommand(command, args);
};

const printHelp = () => {
  console.log("Usage: node contacts.js [command] [arguments]\n");
  console.log("Commands:");
  printHelpCommandTable();
  console.log("\nExamples:");
  examples.forEach((example) => console.log("   ", example));
};

export const printSuccess = (commandResult) => {
  console.log("✅ success!");
  if (commandResult?.message) {
    console.log(commandResult?.message);
  } else {
    console.log(commandResult);
  }
};

export const printError = (error) => {
  console.log("⛔ Error:", error);
};
