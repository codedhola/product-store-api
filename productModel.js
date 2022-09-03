// GET THE DATA FROM DB.JSON 
let Data = require("./db/db.json");
const { idGenerator, writeData } = require("./utils"); // GET FUNCTIONS CREATED FORM UTILS

// RETURN ALL DATA IN DATABASE
function Find(){ 
   return  new Promise((resolve, reject) => {
       try{
           resolve(Data);
       }catch(error){
           reject(error);
       }
   });
}

// GET DATA BASED ON ID FROM DATABASE
function FindById(id){ 
    return new Promise((resolve, reject) => {
        try {
            const product = Data.find(p => p.id == id); // FIND'S DATA MATCH WITH ID 
            resolve(product); // RETURNS ID OR FALSE
        }catch(error){
            reject(error);
        }
    });
}

// CREATE A PRODUCT 
function Create(product){
    try{
        return new Promise((resolve, reject) => {
            const id = idGenerator(120);  // CREATE A DYNAMIC ID FOR THE PRODUCTS
            const newProduct = {id , ...product}  // ADD ID DYNAMICALLY AND GET'S PRODUCT 
            Data.push(newProduct); // PUSH PRODUCT TO DATABASE
            writeData("./db.json", Data); // OVERWRITES PRODUCTS TO UPDATE DATABASE
            resolve(newProduct);
        });
    }catch(error){
        reject(error);
    }
}

// EDIT A PRODUCT
function Edit(id, product){
    try {
        return new Promise((resolve, reject) => {
            const index = Data.findIndex(p => p.id == id); // GET DATA 
            Data[index] = {id, ...product}      // GET INDEX OF DATA
            writeData("./db.json", Data);       // REWRITEDATA TO DATABSE
            resolve(Data[index]);

        });
    }catch(error){

    }
}

// DELETE A PRODUCT
function Delete(id){
    return new Promise((resolve, reject) => {
        Data = Data.filter(p => p.id != id);    // DELETE WITH THE FILTER METHOD
        writeData("./db.json", Data)        // REWRITES DATA TO DB
        resolve();
    })
}

module.exports = {
    Find,
    FindById,
    Create, 
    Edit,
    Delete
}