import fs from "fs";

const isValidFullName = (fullName) => /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(fullName);
const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isValidPhone = (phone) => /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);

export const validateCommand = (command, args) => {
  switch (command) {
    case "add":
      if (args.length === 3 && isValidFullName(args[0]) && isValidEmail(args[1]) && isValidPhone(args[2])) {
        return { isValid: true};
      }
      return {
        isValid: false,
        message:
          args.length > 3
            ? "too many arguments"
            : args.length < 3
              ? "missing arguments"
              : !isValidFullName(args[0])
                ? "invalid full name: " + args[0]
                : !isValidEmail(args[1])
                  ? "invalid email: " + args[1]
                  : "invalid phone: " + args[2],
      };
      break;
    case "list":
      if (args.length === 0) {
        return { isValid: true };
      }
      return { isValid: false, message: "too many arguments" };
      break;
    case "delete":
      if (args.length === 1 && isValidEmail(args[0])) {
        return { isValid: true };
      }
      return {
        isValid: false,
        message: args.length > 1 ? "too many arguments" : args.length < 1 ? "missing arguments" : "invalid email: " + args[0],
      };
      break;
    case "search":
      if (args.length === 1 && (isValidFullName(args[0]) || isValidEmail(args[0]))) {
        return { isValid: true };
      }
      return {
        isValid: false,
        message: args.length > 1 ? "too many arguments" : args.length < 1 ? "missing arguments" : "invalid full name/email: " + args[0],
      };
      break;
  }
};
