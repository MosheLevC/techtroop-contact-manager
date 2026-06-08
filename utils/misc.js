const commandsJson = {
  commands: [
    {
      command: "add",
      parameters: ["name", "email", "phone"],
      description: "Add a new contact",
    },
    {
      command: "list",
      parameters: [],
      description: "List all contacts",
    },
    {
      command: "search",
      parameters: ["query"],
      description: "Search contacts by name or email",
    },
    {
      command: "delete",
      parameters: ["email"],
      description: "Delete contact by email",
    },
    {
      command: "help",
      parameters: [],
      description: "Show this help message",
    },
  ],
};

export const printHelpCommandTable = () => {
  const formattedLines = commandsJson.commands.map((item) => {
    const paramsStr = item.parameters.map((p) => `"${p}"`).join(" ");
    const fullCommand = item.command + (paramsStr ? ` ${paramsStr}` : "");

    return {
      fullCommand,
      description: item.description,
    };
  });

  const maxLength = Math.max(...formattedLines.map((l) => l.fullCommand.length));

  formattedLines.forEach((line) => {
    const alignedCommand = line.fullCommand.padEnd(maxLength);
    console.log(`    ${alignedCommand}  - ${line.description}`);
  });
};

export const examples = [
  'node contacts.js add "John Doe" "john@example.com" "555-123-4567"',
  'node contacts.js search "john"',
  'node contacts.js delete "john@example.com"',
];
