

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
}

module.exports = likeProduct;