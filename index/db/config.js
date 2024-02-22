const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jiya:DpHAosu97Tal4BU9@naturos.8vvt5z9.mongodb.net/e-comm"
  // "mongodb://localhost:27017/naturos"n
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
