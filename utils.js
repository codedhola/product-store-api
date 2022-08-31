const fs = require("fs");

// WRITE'S DATA TO FILE
function writeData(filename, content){
    fs.writeFile(filename, JSON.stringify(content), "utf-8", (err) => {
        if(err){
            console.log(error);
        }

    })
}

// GENERATES ID'S
function idGenerator(floor){
    const id = Math.floor(Math.random() * 100000) + floor;
    return id;
}

// EXPORT MODULES
module.exports = {
    writeData,
    idGenerator
}










