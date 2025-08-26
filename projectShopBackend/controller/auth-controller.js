const createRegister = require("../models/register-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
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
};

const getLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let loginuser = await createRegister.findOne({ email });

    if (!loginuser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, loginuser.password);

    if (matchPassword) {
      const token = jwt.sign({ email: loginuser.email }, process.env.JWT_KEY);

      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
    }

    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Successfully logged in!", loginuser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const UserlogOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: true, // true if using HTTPS
    sameSite: "None", // important for frontend usage
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { createUser, getLoginUser, UserlogOut };
