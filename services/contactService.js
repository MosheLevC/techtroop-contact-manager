const fileUtils = require("../utils/fileUtils")

const CONTACTS_FILE = "contacts.json"

const loadContacts = function () {
    if (!fileUtils.fileExists(CONTACTS_FILE)) {
        return {
            result: true,
            status: "FILE_NOT_FOUND",
            message: "File not found - starting with empty contact list",
            data: []
        }
    }

    const readResult = fileUtils.readFile(CONTACTS_FILE)

    if (!readResult.result) {
        return {
            result: false,
            status: "READ_ERROR",
            message: readResult.message,
            data: []
        }
    }

    try {
        const contacts = JSON.parse(readResult.data)

        return {
            result: true,
            status: "LOADED",
            message: `Loaded ${contacts.length} contacts`,
            data: contacts
        }
    } catch (err) {
        return {
            result: false,
            status: "PARSE_ERROR",
            message: "Error parsing contacts file",
            data: []
        }
    }
}

const saveContacts = function (contacts) {
    const data = JSON.stringify(contacts, null, 2)
    return fileUtils.writeFile(CONTACTS_FILE, data)
}

const isContacfindContactByEmail= function(contacts,contact){
    return contacts.find(u => u.email === contact.email)
}

const addContact = function (contact) {
    const loadResult = loadContacts()

    if (!loadResult.result) {
        return {
        result: false,
        message: [
            loadResult.message
        ]
    }
    }
    const contacts = loadResult.data
    const existingContact = isContactExist(contacts,contact)
    if (existingContact) {
        return {
            result: false,
            message: [
                `${loadResult.message}`,
                "Error: Contact with this email already exists"
            ]
        }
    }

    contacts.push(contact)

    const saveResult = saveContacts(contacts)

    if (!saveResult.result) {
        return {
            result: false,
            message: [
                `${loadResult.message}`,
                `Error: ${saveResult.message}`
            ]
        }
    }

    return {
        result: true,
        message: [
            `${loadResult.message}`,
            `Contact added: ${contact.name}`,
            "Contacts saved to contacts.json"
        ]
    }
}

module.exports = {
    addContact
}