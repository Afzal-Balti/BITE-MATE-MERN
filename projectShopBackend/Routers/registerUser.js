const express = require("express");
const registerUser = express.Router();
const createRegister = require("../models/register-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

registerUser.get("/", (req, res) => {
  res.send("the Register User is --------");
});

registerUser.post("/", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await createRegister.create({
      fullname,
      email,
      password: hashedPassword,
    });
    console.log("user is ------- ", user);

    let token = jwt.sign({ email }, "secert keyy");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // use "none" if cross-origin and HTTPS
      secure: false,
    });
    console.log("THE COOKIE REGISTER IS ===", token);

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = registerUser;
