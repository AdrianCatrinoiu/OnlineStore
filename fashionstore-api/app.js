const express = require("express");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { start } = require("repl");
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
const paginatedResult = (page, array) => {
  const limit = 6;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let prev = false;
  let next = false;
  if (startIndex > 5) {
    prev = true;
  }
  if (array.length > endIndex) {
    next = true;
  }
  const data = {
    array: array.slice(startIndex, endIndex),
    next,
    prev,
  };
  return data;
};
/* Read - GET method */

app.get("/api/store/products", (req, res) => {
  const products = getData("./db/products.json");
  const params = req.query;
  if (params.sku) {
    const product = products.filter(
      (product) => parseInt(product.sku) === parseInt(params.sku)
    );
    const data = {
      data: product[0],
    };
    res.send(data);
  }
  if (params.category) {
    const category_products = products.filter(
      (product) => product.category === params.category
    );
    if (params.page) {
      const { array, next, prev } = paginatedResult(
        params.page,
        category_products
      );
      const data = {
        data: array,
        next,
        prev,
      };
      res.send(data);
    } else {
      const data = {
        data: category_products,
      };
      res.send(data);
    }
  } else if (params.page) {
    const { array, next, prev } = paginatedResult(params.page, products);
    const data = {
      data: array,
      next,
      prev,
    };
    res.send(data);
  } else {
    const data = {
      data: products,
    };
    res.send(data);
  }
});

app.post("/api/store/products", authenticateJWT, (req, res) => {
  const products = getData("./db/products.json");
  const product = req.body;
  const find_exist = products.find((prod) => prod.sku === product.sku);
  if (find_exist) {
    res.status(401).send("Item exists");
  } else {
    const new_products = [...products, product];
    console.log(new_products);
    saveData(new_products, "./db/products.json");
    res.status(200).send("Item added");
  }
});

app.delete("/api/store/products", authenticateJWT, (req, res) => {
  const products = getData("./db/products.json");
  const params = req.query;
  if (params.sku) {
    const find_exist = products.find(
      (prod) => prod.sku === parseInt(params.sku)
    );
    if (!find_exist) {
      res.status(401).send("Item not found");
    } else {
      const new_products = products.filter(
        (product) => parseInt(product.sku) !== parseInt(params.sku)
      );
      console.log(new_products);
      saveData(new_products, "./db/products.json");
      res.status(200).send("Item removed");
    }
  }
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
        id: user.id,
        email: user.email,
        last_name: user.lastName,
        first_name: user.firstName,
        role: user.role,
      },
    });
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

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
