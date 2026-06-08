const contactService = require("../services/contactService")

const handleCommand = function (command, args) {
    //
    // Validation section to check if this command is valid and one of the(add, delete, list, search and help)
    // 
    
    
    //  if we are here then the command is valid now need to seperate into sections
    // and inside before to check the amount of arguments is valid and they are valid 
    //but need to use things from validation.js
    switch(command){
        case "add" :{

        }
        case "delete" :{
            
        }
        case "list" :{
            
        }
        case "search" :{
            
        }
        case "help" :{
            
        }
        default: {
            console.log(`Unknown command: ${command}`)
            console.log("Use: node app.js help")
            return
        }
    }
}





module.exports = {
    handleCommand
}