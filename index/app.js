const express = require("express");
const app = express();
const cors = require("cors");
const ProdReq = require("./db/ProdReq");

const Products = require("./db/Products");

require("./db/config");
const User = require("./db/User");

app.use(express.json());
app.use(cors());

function filterByValue(array, string) {
  return array.filter((o) =>
    Object.keys(o).some((k) =>
      o[k].toLowerCase().includes(string.toLowerCase())
    )
  );
}

app.post("/register", async (req, res, next) => {
  const newUser = req.body;
  try {
    let user = new User(newUser);
    let result = await user.save();
    result = result.toObject();

    delete result.password;
    delete result.id;
    res.status(200).json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., duplicate email)
      res.status(400).json({ message: "Email already exists", error });
    } else {
      // Other errors (e.g., database connection issues)
      res.status(500).json({ message: "Registration failed", error });
    }
  }
});

app.post("/login", async (req, res, next) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");

    if (user) res.status(200).send(user);
    else res.status(404).send({ result: "No user found" });
  }
});

app.post("/add-product", async (req, res, next) => {
  const product = new ProdReq(req.body);
  let result = await product.save();
  res.status(200).json({ message: "Product added", result });
});
app.post("/product", async (req, res, next) => {
  const product = new Products(req.body);
  let result = await product.save();
  res.status(200).json({ message: "Product added", result });
});

app.get("/products-list", async (req, res, next) => {
  const product = await Products.find();
  res.status(200).json(product);
});

app.get("/products-list/:id", async (req, res, next) => {
  try {
    const result = await Products.findOne({ _id: req.params.id });
    res.send(result);
  } catch {
    res.status(404).send({ message: "problem in fetching the data" });
  }
});

app.get("/products-Req", async (req, res, next) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required." });
    }
    const products = await ProdReq.find({ email: email });

    res.status(200).json(products);
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});

app.get("/", (req, res, next) => {
  res.send("api in progress...");
});

app.delete("/products-Req/:id", async (req, res, next) => {
  // res.send(req.params.id);
  try {
    const result = await ProdReq.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});
app.listen(5000);
