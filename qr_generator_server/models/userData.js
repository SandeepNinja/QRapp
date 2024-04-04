const mongoose = require("mongoose");
const ListOfDynamicQR = require("./listOfDynamicQR");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGFjsxZCvbMuKnsJHFywAKXzJh6SsPWVsifY_z36wVT9p38WQ3IQPDPDjhFPDyxv6YQY&usqp=CAU"
    },
    listOfDynamicQRs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListOfDynamicQR",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next){
  const user = this;

  if(!user.isModified("password")){
    next();
  }

  try{
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  }catch(error){
    next(error);
  }
})

module.exports = mongoose.model("UserData", userSchema);
