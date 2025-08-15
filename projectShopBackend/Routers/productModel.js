const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Product = require("../models/product-model");

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./upload";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

productRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, category, oldPrice, newPrice, colors, sale, ratings } =
      req.body;

    const parsedColors = typeof colors === "string" ? JSON.parse(colors) : [];

    const productData = {
      name,
      category,
      oldPrice: parseFloat(oldPrice) || 0,
      newPrice: parseFloat(newPrice) || 0,
      colors: parsedColors,
      image: `/upload/${req.file.filename}`,
      sale: sale === "true" || sale === "on",
      ratings: parseFloat(ratings) || 0,
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json({
      product: savedProduct,
      message: "Product is successfully created",
      status: 200,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ message: err.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("Product found +++++", product.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      product,
    });
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ message: err.message });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = productRouter;
