const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createRegister = require("../models/register-model");

const registerUser = express.Router();

registerUser.post("/", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createRegister.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, process.env.JWT_KEY);

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = registerUser;
