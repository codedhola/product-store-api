const http = require("http");
const fs = require("fs");

// IMPORT ALL LOGIC FROM THE PRODUCT CONTROLLER MODULE
const { allProducts, getProduct, createProduct, editProduct, deleteProduct } = require("./productController");

//  REFERENCE FILE SYSTEM TO RENDER HTML
const html = fs.readFileSync("index.html", "utf-8");

// INIT A SERVER
const server = http.createServer((req, res) => {
    const Url = req.url;
    const Method = req.method;

    // @ROUTES => INDEX PAGE    ||     RENDER THE INDEX.HTML PAGE 
    if(Url === "/" || Url === "/index" && Method === "GET"){
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(html);
    }

    // @ROUTES => API/PRODUCTS     ||    <GET> ALL PRODUCTS FROM DB
    else if(Url === "/api/products" && Method === "GET"){
        allProducts(req, res);   
    }

    // @ROUTES => API/PRODUCTS/ID   ||   <GET> A PRODUCT FROM DB
    else if(Url.match(/api\/products\/([0-9]+)/) && Method === "GET"){
        const id = Url.split('/');
        getProduct(req, res, id[3]);
    }

    // @ROUTES => API/PRODUCTS  ||  <POST> A PRODUCT TO DB
    else if(Url === "/api/products" && Method === "POST"){

        createProduct(req, res);
    }

    // @ROUTES => API/PRODUCTS     || <PUT> A PRODUCT TO DB
    else if(Url.match(/\/api\/products\/([0-9])+/) && Method === "PUT"){
        const id = Url.split("/");
        editProduct(req, res, id[3]);
    }

    else if(Url.match(/\/api\/products\/([0-9])+/) && Method === "DELETE"){
        const id = Url.split("/");
        deleteProduct(req, res, id[3]);
    }

    // @ROUTES => UNKNOWN    || GET OR POST
    else {
        res.writeHead(404,{"Content-Type": "text/html"});
        res.write("Could not find page...");
    } 
       
});

// LISTEN TO SERVER ON PORT ==> PORT OR 3000
server.listen(3000, () => {
    console.log(`Port running succesfully...`);

});


