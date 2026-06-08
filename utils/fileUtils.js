const fs = require("fs")
const path = require("path")

const getRootFilePath = function (fileName) {
    return path.join(__dirname, "..", fileName)
}

const createFile = function (fileName, content = "[]") {
    const filePath = getRootFilePath(fileName)

    if (fs.existsSync(filePath)) {
        return { result: false, message: "File already exists" }
    }

    try {
        fs.writeFileSync(filePath, content)
        return { result: true, message: "File created" }
    } catch (err) {
        return { result: false, message: "Error creating file" }
    }
}

const fileExists = function (fileName) {
    const filePath = getRootFilePath(fileName)
    return fs.existsSync(filePath)

}

const readFile = function (fileName) {
    const filePath = getRootFilePath(fileName)
    try {
        const content = fs.readFileSync(filePath,"utf-8")
        return {result:true , data: content}
    } catch (err) {
        return { result: false, message: "Error reading file" }
    }

}

const writeFile = function (fileName, data) {
    const filePath = getRootFilePath(fileName)
    try { 
        fs.writeFileSync(filePath,data,"utf-8")
        return { result: true, message: "File saved" }  
        
    } catch (error) {
        return { result: false, message: "Error writing file" }
    }

}

module.exports = {
    createFile,
    fileExists,
    readFile,
    writeFile
}