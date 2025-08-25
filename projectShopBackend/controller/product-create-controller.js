const Product = require("../models/product-model");
const multer = require("multer");
const fs = require("fs");

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

const productCreateItems = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const {
        name,
        category,
        oldPrice,
        newPrice,
        colors,
        sale,
        ratings,
        description,
      } = req.body;

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
        description,
      };

      const product = new Product(productData);
      console.log("THE PRODUCT CREATED DATA IS ----- ", product);
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
  },
];

module.exports = productCreateItems;
