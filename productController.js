const { Find, FindById } = require("./productModel");


async function allProducts(req, res){
    try {
      const store = await Find();
      res.writeHead(200, {"Content-Type" : "application/json"});
      res.end(JSON.stringify(store));
    }catch(error){
        throw error;
    }
}

async function getProduct(req, res, id){
    try {
        const store = await FindById(id);
        if(!store){
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({ms: "PRODUCT NOT IN STORE"}));
        }else{
            res.writeHead(200, {"Content-Type" : "application/json"});
            res.end(JSON.stringify(store));
        }
    }catch(error){
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({msg: "Product not in store"}));
    }
}


module.exports = { 
    allProducts, 
    getProduct
}