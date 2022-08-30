const Data = require("./db.json");

function Find(){
   return  new Promise((resolve, reject) => {
       try{
           resolve(Data);
       }catch(error){
           reject(error);
       }
   });
}

module.exports = {
    Find,
}