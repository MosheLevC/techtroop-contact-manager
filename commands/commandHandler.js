import { examples, printHelpCommandTable } from "../utils/misc.js";
import { validateCommand } from "../utils/validation.js";

export const handleCommand = (command, args) => {
  if (command === "help") {
    printHelp();
    return { shouldExit: true };
  }

  if (command !== "add" && command !== "list" && command !== "delete" && command !== "search") {
    console.log(`no such command ${command}\n`);
    printHelp();
    return { shouldExit: true };
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

export const printSuccess = (messageArr, data) => {
  console.log("✅ success:");
  messageArr.forEach((element) => console.log(element));

  if (data?.length > 0) {
    console.log("=== All Contacts ===");
    for (let i = 0; i < data.length; i++) {
      console.log(`${i + 1}. ${data[i].name} - ${data[i].email} - ${data[i].phone}`);
    }
  }
};

export const printError = (messageArr) => {
  const messages = Array.isArray(messageArr) ? messageArr : [messageArr];

  console.log("⛔ Error:");
  messages.forEach((message) => console.log(message));
};
