const mongoose = require("mongoose");
const URL = process.env.SERVER_MONGODB_URI;
mongoose.connect(URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error to connect MongoDB"));

db.once("open", function () {
  console.log("connected to database :: MongoDB");
});

module.exports = db;
