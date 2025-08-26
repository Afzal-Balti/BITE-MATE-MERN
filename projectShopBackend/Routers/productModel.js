const express = require("express");
const Product = require("../models/product-model");
require("dotenv").config();
const {
  productCreateItems,
  productItemById,
  productShowPagination,
  likeProduct,
  dislike,
  striptPayment,
} = require("../controller/product-controller");

const productRouter = express.Router();

productRouter.post("/", productCreateItems);

productRouter.get("/:id", productItemById);

productRouter.get("/", productShowPagination);

productRouter.post("/:id/like", likeProduct);

productRouter.post("/:id/dislike", dislike);

productRouter.post("/payment", striptPayment);

module.exports = productRouter;
