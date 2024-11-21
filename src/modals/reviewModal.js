const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    mobileNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },

  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
