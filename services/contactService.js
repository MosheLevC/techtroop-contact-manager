const { log } = require("node:console")
const fileUtils = require("../utils/fileUtils")

const CONTACTS_FILE = "contacts.json"

const handleFileAction = function(command, args) {
    switch (command) {
        case "add":
            return addContact(createContact(args))

        case "list":
            return listContacts()

        case "search":
            if (args[0].includes("@")) {
                return searchContactsByEmail(args[0])
            }
            return searchContactsByName(args[0])

        case "delete":
            return deleteContact(args[0])

        default:
            return {
                success: false,
                messageArr: ["Invalid command"],
                data: []
            }
    }
}

const searchContactsByEmail = function(email){
    const loadResult = listContacts()

    if (!loadResult.success) {
        return {
            success: false,
            messageArr: [...loadResult.messageArr],
            data: []
        }
    }

    const contacts = loadResult.data

    const usersWithTheSameEmail = contacts.filter(u => {
        return u.email.toLowerCase().includes(email.toLowerCase())
    })

    if (usersWithTheSameEmail.length === 0) {
        return {
            success: false,
            messageArr: [`no contacts found for the email ${email}`],
            data: []
        }
    }

    return {
        success: true,
        messageArr: [
            ...loadResult.messageArr,
            `Found ${usersWithTheSameEmail.length} contact(s) matching: ${email}`
        ],
        data: usersWithTheSameEmail
    }
}

const deleteContact = function(email) {
    const loadResult = listContacts()

    if (!loadResult.success) {
        return {
            success: false,
            messageArr: [...loadResult.messageArr],
            data: []
        }
    }

    const contacts = loadResult.data

    const contactToDelete = contacts.find(u => {
        return u.email.toLowerCase() === email.toLowerCase()
    })

    if (!contactToDelete) {
        return {
            success: false,
            messageArr: [
                ...loadResult.messageArr,
                `Contact with email ${email} was not found`
            ],
            data: []
        }
    }

    const updatedContacts = contacts.filter(u => {
        return u.email.toLowerCase() !== email.toLowerCase()
    })

    const saveResult = saveContacts(updatedContacts)

    if (!saveResult.success) {
        return {
            success: false,
            messageArr: [
                ...loadResult.messageArr,
                `Error: ${saveResult.message}`
            ],
            data: []
        }
    }

    return {
        success: true,
        messageArr: [
            ...loadResult.messageArr,
            `Contact deleted: ${contactToDelete.name}`,
            "Contacts saved to contacts.json"
        ],
        data: []
    }
}
   

const listContacts = function () {
    if (!fileUtils.fileExists(CONTACTS_FILE)) {
        return {
            success: false,
            status: "FILE_NOT_FOUND",
            messageArr: ["File not found - starting with empty contact list"],
            data: []
        }
    }

    const readResult = fileUtils.readFile(CONTACTS_FILE)

    if (!readResult.success) {
        return {
            success: false,
            status: "READ_ERROR",
            messageArr: [readResult.message],
            data: []
        }
    }

    try {
        const contacts = JSON.parse(readResult.data)

        return {
            success: true,
            status: "LOADED",
            messageArr: [`Loaded ${contacts.length} contacts\n`] ,
            data: contacts
        }
    } catch (err) {
        return {
            success: false,
            status: "PARSE_ERROR",
            messageArr: ["Error parsing contacts file"],
            data: []
        }
    }
}

const saveContacts = function (contacts) {
    const data = JSON.stringify(contacts, null, 2)
    return fileUtils.writeFile(CONTACTS_FILE, data)
}

const isContactExist= function(contacts,contact){
    return contacts.find(u => u.email === contact.email)
}



const searchContactsByName = function (name){
    const loadResult = listContacts()
    if (!loadResult.success){
        return {
            success: false,
            messageArr: [...loadResult.messageArr],
            data : []
        }
    }
    const contacts = loadResult.data
    let usersWithTheSameName = []
    usersWithTheSameName = contacts.filter(u => {
        return u.name.toLowerCase().includes(name.toLowerCase())
    })
    if (usersWithTheSameName.length === 0){
        return {
            success: false,
            messageArr: [`no contacts found for the name ${name}`],
            data : []

        }
    }
    return {
        success: true,
        messageArr: [
            ...loadResult.messageArr,
            `Found ${usersWithTheSameName.length} contact(s) matching: ${name}`,
        ],
        data: usersWithTheSameName
    }
}

const createContact = function(args){
    return {name:args[0] , email:args[1] , phone:args[2]}
}

const addContact = function (contact) {
    const loadResult = listContacts()
    const isMissingContactsFile = loadResult.status === "FILE_NOT_FOUND"

    if (!loadResult.success && !isMissingContactsFile) {
        return {
            success: false,
            messageArr: [...loadResult.messageArr],
            data: []
        }
    }

    const contacts = isMissingContactsFile ? [] : loadResult.data
    const existingContact = isContactExist(contacts,contact)
    if (existingContact) {
        return {
            success: false,
            messageArr: [
                ...loadResult.messageArr,
                "Error: Contact with this email already exists"
            ],
            data: []
        }
    }
    contacts.push(contact)

    const saveResult = saveContacts(contacts)

    if (!saveResult.success) {
        return {
            success: false,
            messageArr: [
                ...loadResult.messageArr,
                `Error: ${saveResult.message}`
            ],
            data: []
        }
    }

    return {
        success: true,
        messageArr: [
            ...loadResult.messageArr,
            `Contact added: ${contact.name}`,
            "Contacts saved to contacts.json"
        ],
        data: []
    }
}

module.exports = {
    addContact,
    isContactExist,
    saveContacts,
    deleteContact,
    searchContactsByEmail,
    handleFileAction,
    loadContacts: listContacts,
    searchContactsByName
}
