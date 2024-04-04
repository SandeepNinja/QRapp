const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 10, // The document will be automatically deleted after 10 minutes of its creation time
    },
  });

  module.exports = mongoose.model("OTP", otpSchema);