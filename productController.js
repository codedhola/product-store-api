const { Find } = require("./productModel");


async function allProducts(req, res){
    try {
      const store = await Find();
      res.writeHead(200, {"Content-Type" : "application/json"});
      res.end(JSON.stringify(store));
    }catch(error){

    }
}


module.exports = { 
    allProducts
}