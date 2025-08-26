const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Fruit and vegetables",
        "Excessive Sugar",
        "Vegetarian Dishes",
        "Protein",
        "Fat",
        "Salads",
        "Soups",
        "Other",
      ],
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    colors: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    likes: [{ type: String }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("allproducts", productSchema);
