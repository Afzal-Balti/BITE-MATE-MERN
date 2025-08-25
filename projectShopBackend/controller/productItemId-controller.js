const Product = require("../models/product-model");
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

module.exports = productItemById;
