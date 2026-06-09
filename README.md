# Contact CLI App

A simple command-line application for managing contacts using Node.js.

The app allows users to add, list, search, and delete contacts directly from the terminal.
Contacts are stored locally in a JSON file.

## Features

* Add a new contact
* List all saved contacts
* Search contacts by name or email
* Delete a contact by email
* Validate user input
* Store contacts in a local JSON file
* Display help instructions for available commands

## Technologies

* Node.js
* JavaScript
* JSON
* File System module

## Project Structure

```txt
.
├── app.js
├── commands/
│   └── commandHandler.js
├── services/
│   └── contactService.js
├── utils/
│   ├── fileUtils.js
│   ├── validation.js
│   └── misc.js
├── command.json
└── contacts.json
```

## Available Commands

```bash
node app.js add "John Doe" "john@example.com" "555-123-4567"
node app.js list
node app.js search "john"
node app.js delete "john@example.com"
node app.js help
```

## Architecture

The project follows a simple MVC-inspired structure:

* `app.js` - Main entry point of the application
* `commandHandler.js` - Handles commands and user messages
* `contactService.js` - Contains the contact management logic
* `fileUtils.js` - Handles file system operations
* `validation.js` - Validates commands and user input

## Data Storage

Contacts are saved locally inside `contacts.json` as an array of objects:

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567"
  }
]
```

## Status

This project is currently in development as part of a Node.js command-line application exercise.
