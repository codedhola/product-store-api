const http = require("http");
const fs = require("fs");
const { allProducts, getProduct } = require("./productController");

//  REFERENCE FILE SYSTEM FOR JSON
const html = fs.readFileSync("index.html", "utf-8");

// INIT A SERVER
const server = http.createServer((req, res) =>{
    const Url = req.url;
    const Method = req.method;

    // @ROUTES => INDEX PAGE 
    if(Url === "/" || Url === "/index" && Method === "GET"){
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(html);
    }
    // @ROUTES => API/PRODUCTS
    else if(Url === "/api/products" && Method === "GET"){
        allProducts(req, res);
    }
    // @ROUTES => API/PRODUCTS/ID   
    else if(Url.match(/api\/products\/([0-9]+)/) && Method === "GET"){
        const id = Url.split('/');
        getProduct(req, res, id[3]);
    }else {
        res.writeHead(404,{"Content-Type": "text/html"});
        res.write("Could not find page...");
    } 
       
});

server.listen(3000, () => {
    console.log(`Port running succesfully...`);

});


