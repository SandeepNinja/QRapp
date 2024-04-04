const mongoose = require("mongoose");
const ListOfDynamicQR = require("./listOfDynamicQR");
const bcrypt = require('bcryptjs');

const countSchema = new mongoose.Schema(
  {
    homePageOpenCount: {
      type: Number,
      
    },
    StaticQrDownloadCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("homePageCount", countSchema);
