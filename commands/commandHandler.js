import { examples, printHelpCommandTable } from "../utils/misc.js";
import { validateCommand } from "../utils/validation.js";

export const handleCommand = (command, args) => {
  if (command !== "add" && command !== "list" && command !== "delete" && command !== "search") {
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

export const printSuccess = (message, data) => {
  console.log("✅ success:");
  console.log(message, "\n");

  if (data.length > 0) {
    console.log("=== All Contacts ===");
    for (let i = 0; i < data.length; i++) {
      console.log(`${i}. ${data[i].fullName} - ${data[i].email} - ${data[i].phone}`);
    }
  }
};

export const printError = (error) => {
  console.log("⛔ Error:", error);
};
