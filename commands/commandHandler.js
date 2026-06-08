import { validateCommand } from "../utils/validation.js";

export const handleValidation = (command, args) => {
  return validateCommand(command, args);
};
