const express = require("express");
const registerUser = express.Router();
const createRegister = require("../models/register-model");
const bcrypt = require("bcrypt");

registerUser.get("/", (req, res) => {
  res.send("the Register User is --------");
});

registerUser.post("/create", async (req, res) => {
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

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = registerUser;
