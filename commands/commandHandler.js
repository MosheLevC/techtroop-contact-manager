import { validateCommand } from "../utils/validation.js";

export const handleCommand = (command, args) => {
  return validateCommand(command, args);
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
