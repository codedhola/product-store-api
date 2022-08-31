const Data = require("./db.json");

const { writeData } = require("./utils");

function Find(){
   return  new Promise((resolve, reject) => {
       try{
           resolve(Data);
       }catch(error){
           reject(error);
       }
   });
}

function FindById(id){
    return new Promise((resolve, reject) => {
        try {
            const product = Data.find(p => p.id == id);
            resolve(product);
        }catch(error){
            reject(error);
        }
    });
}

function Create(product){
    try{
        const newProduct = {}
    }catch(error){

    }
}

module.exports = {
    Find,
    FindById
}