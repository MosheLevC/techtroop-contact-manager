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
                message: "Invalid command",
                data: []
            }
    }
}

const searchContactsByEmail = function(email){
    const loadResult = listContacts()

    if (!loadResult.success) {
        return {
            success: false,
            message: loadResult.message,
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
            message: `no contacts found for the email ${email}`,
            data: []
        }
    }

    return {
        success: true,
        message: [
            loadResult.message,
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
            message: loadResult.message,
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
            message: [
                loadResult.message,
                `Error: Contact with email ${email} was not found`
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
            message: [
                loadResult.message,
                `Error: ${saveResult.message}`
            ],
            data: []
        }
    }

    return {
        success: true,
        message: [
            loadResult.message,
            `Contact deleted: ${contactToDelete.name}`,
            "Contacts saved to contacts.json"
        ],
        data: updatedContacts
    }
}
   

const listContacts = function () {
    if (!fileUtils.fileExists(CONTACTS_FILE)) {
        return {
            success: true,
            status: "FILE_NOT_FOUND",
            message: "File not found - starting with empty contact list",
            data: []
        }
    }

    const readResult = fileUtils.readFile(CONTACTS_FILE)

    if (!readResult.success) {
        return {
            success: false,
            status: "READ_ERROR",
            message: readResult.message,
            data: []
        }
    }

    try {
        const contacts = JSON.parse(readResult.data)

        return {
            success: true,
            status: "LOADED",
            message: `Loaded ${contacts.length} contacts`,
            data: contacts
        }
    } catch (err) {
        return {
            success: false,
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

const isContactExist= function(contacts,contact){
    return contacts.find(u => u.email === contact.email)
}



const searchContactsByName = function (name){
    const loadResult = listContacts()
    if (!loadResult.success){
        return {
            success: false,
            message : loadResult.message,
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
            message : `no contacts found for the name ${name}`,
            data : []

        }
    }
    return {
        success: true,
        message: [
            loadResult.message,
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

    if (!loadResult.success) {
        return {
        success: false,
        message: [
            loadResult.message
        ]
    }
    }
    const contacts = loadResult.data
    const existingContact = isContactExist(contacts,contact)
    if (existingContact) {
        return {
            success: false,
            message: [
                `${loadResult.message}`,
                "Error: Contact with this email already exists"
            ]
        }
    }
    contacts.push(contact)

    const saveResult = saveContacts(contacts)

    if (!saveResult.success) {
        return {
            success: false,
            message: [
                `${loadResult.message}`,
                `Error: ${saveResult.message}`
            ]
        }
    }

    return {
        success: true,
        message: [
            `${loadResult.message}`,
            `Contact added: ${contact.name}`,
            "Contacts saved to contacts.json"
        ]
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