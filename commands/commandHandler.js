import { validateCommand } from "../utils/validation.js";

export const handleCommand = (command, args) => {
  return validateCommand(command, args);
};
