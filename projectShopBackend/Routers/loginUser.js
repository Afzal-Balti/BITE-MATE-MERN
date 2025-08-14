const express = require("express");
const loginUser = express.Router();
const createRegister = require("../models/register-model");
const bcrypt = require("bcrypt");

loginUser.get("/", (req, res) => {
  res.send("the Register User is --------");
});

loginUser.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let loginuser = await createRegister.findOne({ email });

    if (!loginuser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, loginuser.password);

    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Successfully logged in!", loginuser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = loginUser;
