# Contact CLI App

## MVC Structure

### Controller

```txt
app.js
```

### Model

```txt
contactService.js
```

### View

The view will be based on `console.log` for printing messages to the user.

`commandHandler` will be responsible for all the messages and error messages to the CLI to inform the user.

---

## Manual Files

These files will be created manually.

---

## Commands

The system will have an array of commands.

Each command has:

```js
{
  name,
  arguments_placeholder,
  description
}
```

---

## Examples

The system will have an array of strings with examples of how to use the commands.

---

# Commands Behavior

## Add

### Arguments

```js
{
  name,
  email,
  phonenumber
}
```

### Return

Returns to `app.js`:

```txt
{ true / false, message }
```

---

## Delete

### Arguments

```js
{
  email
}
```

### Return

```txt
{ true / false, message }
```

---

## List

### Arguments

```js
{}
```

### Return

Returns an array of objects with all the contacts in the system:

```js
[
  {
    name,
    email,
    phonenumber
  }
]
```

Or prints a no contacts found message.

---

## Search

### Arguments

```js
{
  name
}
```

### Return

Returns an array of objects with all the contacts that match the name:

```js
[
  {
    name,
    email,
    phonenumber
  }
]
```

If no contact is found and the list is empty, print:

```txt
No contact found matching {name}
```

---

## Help

### Arguments

```js
{}
```

### Return

Prints all the available commands with their description and arguments placeholder.

Also prints the examples array.

---

## Any Other Command

### Return

Prints an error message and then invokes the help method.

---

# Validation

The system should validate the following:

* Check if the command is valid, meaning one of the commands above.
* Check if there are missing arguments for the command.
* Check if email is in a valid format with simple Regex.
* Check if phone number is in a valid format with simple Regex:

  * One Regex for Israel version.
  * One Regex for example version.
  * In the future, make with Claude a better Regex.
* Check if a contact with the same email already exists in the system when adding a new contact.
* Check if the contact exists in the system when deleting a contact.

---

# Files Purpose

## `app.js`

Main file that will run the application.

It will communicate with the command handler and contact service to perform the actions based on the user input and the system flow.

---

## `Utils/validation.js`

Will have all the functions to validate the user input for the commands, such as:

* Checking if the command is valid.
* Checking if the arguments are valid.
* Other validation logic.

---

## `Utils/fileUtils.js`

Will have all the functions related to the file system, such as:

* Open file.
* Write to file.
* Delete file.
* Close file.
* Other file system actions.

---

## `Services/contactService.js`

Will do all the actions using `fileUtils` to read/write to the file, such as:

* Adding a contact.
* Deleting a contact.
* Listing all contacts.
* Searching for a contact.
* Other contact-related actions.

---

# Flow of System

1. `app.js` runs and sends arguments to the command handler.
2. `commandHandler` checks the command and uses the validation functions from `validation.js` to validate the command and its arguments.
3. If the command is valid or invalid, `commandHandler` tells the result to `app.js`.
4. `app.js` passes the command and its arguments to `contactService` to perform the action.
5. `contactService` uses `fileUtils` to read/write to the file and perform the action based on the command and its arguments.
6. `contactService` returns the result of the action to `app.js`.
7. `app.js` passes the result to `commandHandler`.
8. `commandHandler` prints the appropriate message to the user.
9. Exit app.

---

## System Flow Diagram

```txt
app.js
  => commandHandler
  => validation
  => app.js
  => contactService
  => fileUtils
  => app.js
  => commandHandler
  => print message to user
```

---

# How Do I Send the Arguments to the Command Handler?

I can create a function in `commandHandler.js` that takes the command and its arguments as parameters, and then call that function from `app.js` with the user input as arguments.

---

## Example

### In `commandHandler.js`

```js
function handleCommand(command, args) {
  // validate command and arguments
  // call appropriate function from contactService.js based on the command
}

module.exports = { handleCommand };
```

### In `app.js`

```js
const { handleCommand } = require('./commandHandler');

const [, , ...args] = process.argv;

handleCommand(args[0], args.slice(1)); // pass the command
```
