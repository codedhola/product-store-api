// IMPORT THE DATA MODELING FROM THE PRODUCT MODEL MODULES
const { Find, FindById, Create } = require("./productModel");

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
        let body = "";
        req.on("data", (data) => { // GETS DATA FROM USER BODY 
            body += data.toString();
        });
        
        req.on("end", async () =>{

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
        });

    }catch(error){
        console.log(error);
    }
}


module.exports = { 
    allProducts, 
    getProduct,
    createProduct
}