const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/mongoose");

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ limit: '10mb',extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use("/", require("./routes"));

app.listen(PORT, function (err) {
  if (err) {
    console.log("error in starting the server ::", err);
  }
  console.log("! Server is up and running on port :: ", PORT);
});
