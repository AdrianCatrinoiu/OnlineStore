const express = require("express");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

app.use(express.static("db"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  const output = { value: "hello world!" };
  res.send(output);
});

const generateToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

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

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = getData("./db/users.json");

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = generateToken({
      role: user.role,
      email: user.email,
      name: user.name,
    });

    res.json({
      accessToken: token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

/* Create - POST method */
app.post("/api/auth/register", (req, res) => {
  //get the existing user data
  const existUsers = getData("./db/users.json");

  //get the new user data from post request
  const userData = req.body;
  //check if the userData fields are missing
  if (
    userData.email == null ||
    userData.password == null ||
    userData.firstName == null ||
    userData.lastName == null
  ) {
    return res.status(401).send({ error: true, msg: "User data missing" });
  }

  //check if the email exist already
  const findExist = existUsers.find((user) => user.email === userData.email);
  if (findExist) {
    return res.status(409).send({ error: true, msg: "email already exist" });
  }
  const id = Math.floor(1000000 + Math.random() * 9000000);
  const newUser = { id: id, ...userData, role: "user" };
  //append the user data
  existUsers.push(newUser);
  //save the new user data
  saveData(existUsers, "./db/users.json");
  const token = generateToken({
    role: "user",
    email: userData.email,
    name: userData.name,
  });

  res.status(201).json({
    accessToken: token,
    user: {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    },
  });
});

app.listen(5000, () => {
  console.log("Server runs on port 5000");
});
