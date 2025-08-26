const Product = require("../models/product-model");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECERT_STRIPE_KEY);

const productShowPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments();

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

const productItemById = async (req, res) => {
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
};

const likeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    console.log("REQ.PARAMS.ID --->", id);
    console.log("REQ.BODY.USERID --->", username);

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.likes.includes(username)) {
      return res.status(400).json({ message: "Already liked" });
    }

    product.likes.push(username);
    await product.save();

    res.json({ message: "Product liked", likes: product.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const dislike = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: "-1" } },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const striptPayment = async (req, res) => {
  const { name, newPrice, email } = req.body;

  try {
    const product = await stripe.products.create({
      name,
    });
    console.log("proudct ", product);

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: newPrice * 100,
      currency: "pkr",
    });
    console.log("price ", price);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: email,
    });

    console.log("session ", session);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  productShowPagination,
  productCreateItems,
  productItemById,
  likeProduct,
  dislike,
  striptPayment,
};
