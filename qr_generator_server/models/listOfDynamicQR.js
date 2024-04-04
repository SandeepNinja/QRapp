const mongoose = require("mongoose");
const LinkList = require("./listOfLink");

const dynamicQrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default:"https://www.svgrepo.com/show/415676/compose-note-pen.svg"
    },
    listOfLinks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LinkList",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ListOfDynamicQR", dynamicQrSchema);
