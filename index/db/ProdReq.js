const mongoose = require("mongoose");

const ProdReq = new mongoose.Schema({
  name: String,
  price: String,
  category: String, //male female childrens
  length: String,
  quantity: String,
  description: String,
  email: String,
  //   fibre: String,
  //   size: String,
  //   color: String,
  //   rating: Number,
  //   reviews: [
  //     {
  //       user: String,
  //       rating: Number,
  //       comment: String,
  //     },
  //   ],
  //   images: [String],
});
module.exports = mongoose.model("prodReq", ProdReq);
