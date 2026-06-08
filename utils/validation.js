import fs from "fs";
//   const commands = await fs.readFileSync("Command.JSON", "utf8");
//   const commandsJson = JSON.parse(commands);
//   const commandList = commandsJson.commands.map((item) => item.command);

const testFullNameRegex = (fullName) => /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(fullName);
const testEmailRegex = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const testPhoneRegex = (phone) => /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);

export const validateCommand = (command, args) => {
  switch (command) {
    case "add":
      if (args.length === 3 && testFullNameRegex(args[0]) && testEmailRegex(args[1]) && testPhoneRegex(args[2])) {
        return true;
      }
      return false;
      break;
    case "list":
      if (args.length === 0) {
        return true;
      }
      return false;
      break;
    case "delete":
      if (args.length === 1 && testEmailRegex(args[0])) {
        return true;
      }
      return false;
      break;
    case "search":
      if (args.length === 1 && (testFullNameRegex(args[0]) || testEmailRegex(args[0]))) {
        return true;
      }
      return false;
      break;
    default:
      if (args.length === 0) {
        return true;
      }
      return false;
      break;
  }
};
