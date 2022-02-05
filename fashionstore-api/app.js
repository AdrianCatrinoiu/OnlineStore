const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.static("db"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  const output = { value: "hello world!" };
  res.send(output);
});
const saveData = (data, json) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(json, stringifyData);
};

const getData = (json) => {
  const jsonData = fs.readFileSync(json);
  return JSON.parse(jsonData);
};

/* Read - GET method */
app.get("/search", (req, res) => {
  const products = getData("./db/products.json");

  res.send(products);
});

/* Create - POST method */
app.post("/search/add", (req, res) => {
  //get the existing product data
  const existsProducts = getData("/db/products.json");

  //get the new product data from post request
  const productData = req.body;
  //check if the productData fields are missing
  if (
    product.name == null ||
    product.price == null ||
    product.image == null ||
    product.description == null
  ) {
    return res.status(401).send({ error: true, msg: "Product data missing" });
  }

  //check if the name exist already
  const findExist = existsProducts.find(
    (product) => product.name === productData.name
  );
  if (findExist) {
    return res.status(409).send({ error: true, msg: "name already exist" });
  }
  //append the product data
  existsProducts.push(productData);
  //save the new product data
  saveproductData(existsProducts);
  res.send({ success: true, msg: "Product data added successfully" });
});

app.listen(5000, () => {
  console.log("Server runs on port 5000");
});
