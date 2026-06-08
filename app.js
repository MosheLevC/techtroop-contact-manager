const contactService = require("./services/contactService")
const { handleCommand } = require("./commands/commandHandler")

const [,,command,...args] = process.argv