const fs = require("fs");


function writeData(filename, content){
    fs.writeFile(filename, JSON.stringify(content), "utf-8", (err) => {
        if(err){
            console.log(error);
        }
    })
}


module.exports = {
    writeData
}