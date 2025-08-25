const express = require("express");
const Product = require("../models/product-model");
const productCreateItems = require("../controller/product-create-controller");
const productItemById = require("../controller/productItemId-controller");
const productShowPagination = require("../controller/allProduct-controller");
const likeProduct = require("../controller/likeProducts");
const dislike = require("../controller/disLikeProduct-controller");
const productRouter = express.Router();

productRouter.post("/", productCreateItems);

productRouter.get("/:id", productItemById);

productRouter.get("/", productShowPagination);

productRouter.post("/:id/like", likeProduct);

productRouter.post("/:id/dislike", dislike);

module.exports = productRouter;
