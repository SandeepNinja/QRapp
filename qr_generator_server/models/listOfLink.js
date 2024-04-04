const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    linkLogo: {
      type: String,
      default:"https://www.svgrepo.com/show/258046/route.svg"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LinkList", linkSchema);
