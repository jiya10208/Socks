const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  length: String,
  quantity: String,
  description: String,
  size: String,
  color: String,
  //   images: [String],
});

module.exports = mongoose.model("products", productSchema);
