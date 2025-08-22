const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECERT_STRIPE_KEY);

const stripeRouter = express.Router();

stripeRouter.post("/", async (req, res) => {
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
});

module.exports = stripeRouter;
