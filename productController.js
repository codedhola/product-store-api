// IMPORT THE DATA MODELING FROM THE PRODUCT MODEL MODULES
const { Find, FindById, Create, Edit, Delete } = require("./productModel");
const { getData } = require("./utils")

// RETRIEVE ALL PRODUCT
async function allProducts(req, res){
    try {
      const store = await Find(); // GET PRODUCTS FROM @ FIND(MODULE) FUNCTION
      res.writeHead(200, {"Content-Type" : "application/json"});
      res.end(JSON.stringify(store));  // RENDER PRODUCTS 
    }catch(error){
        throw error;
    }
}

// RETRIEVE PRODUCT BASED ON ID OF PRODUCT GIVEN
async function getProduct(req, res, id){
    try {
        const store = await FindById(id);  // GET PRODUCT BASED ON ID
        if(!store){  // RESPONSE IF ID ISN'T FOUND
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({message: "PRODUCT NOT IN STORE"}));
        }else{
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(store));
        }
    }catch(error){
        res.writeHead(500, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "An error occurred"}));
    }
}

// CREATE A PRODUCT LOGIC
async function createProduct(req, res){

    try{
        const body = await getData(req);

         // PARSE DATA INDIVIDUALLY TO IT'S RESPECTIVE VARIABLE
         const { productName, productSpec, price, currency, type, img } = JSON.parse(body); 
         const product = {
             productName,
             productSpec,
             price,
             currency,
             type,
             img
             }
         const newProduct = await Create(product);  // CREATES PRODUCTS 
         res.writeHead(201, {"Content-Type": "application/json" })
         return res.end(JSON.stringify(newProduct)); // SEND PRODUCT

        }catch(error){
        console.log(error);
    }
}

//  EDIT A PROUCT FROM DB WITH GIVEN ID
async function editProduct(req, res, id){
    try {
        const product = await FindById(id);  // FIND THE PRODUCT FROM DB WITH ID

        // RESPONSE IF PRODUCT ISN'T FOUND
        if(!product){
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({message: " Couldn't find product to edit"}));
        }else {
        const body = await getData(req);    // GET THE DATA FROM USER

         // PARSE DATA INDIVIDUALLY TO IT'S RESPECTIVE VARIABLE
         const { productName, productSpec, price, currency, type, img } = JSON.parse(body); 
         const productData = {
             productName: productName || product.productName,
             productSpec: productSpec || product.productSpec,
             price: price || product.price,
             currency: currency || product.currency,
             type: type || product.type,
             img: img || product.img
             }
         const updateProduct = await Edit(id, productData);  // EDITS PRODUCTS 
         res.writeHead(200, {"Content-Type": "application/json" })
         return res.end(JSON.stringify(updateProduct)); // SEND EDITED PRODUCT
        }


    }catch(error){
        throw error;
    }
}

// DELETES PRODUCT WITH GIVEN ID FROM THE DB
async function deleteProduct(req, res, id){
    try {
        const product = await FindById(id);  // SEARCH ID FROM DB

        // RESPONSE IF ID ISN'T FOUND
        if(!product){
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({message: "Could not find product to be deleted"}));
        }else {
            await Delete(id);  // DELETE PRODUCT FROM DB
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({message: "PRODUCT DELETED SUCCESSFULLY"}));  // RESPONSE ONCE SUCCESSFUL
        }

    }catch(error){
        throw error;
    }
}


module.exports = { 
    allProducts, 
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}