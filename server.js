const http = require("http");
const fs = require("fs");
const { allProducts } = require("./productController");

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
    else if(Url === "/api/products/" && Method === "POST"){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write("Hello post");
        res.end();
    }else {
        res.writeHead(404,{"Content-Type": "text/html"});
        res.write("Could not found page...");
    } 
       
});

server.listen(3000, () => {
    console.log(`Port running succesfully...`);

});


