const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/register-model");

module.exports = async function (req, res, next) {
  if (!req.cookies?.token) {
    res.redirect("/");
  }

  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let users = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    req.users = users;
    next();
  } catch (err) {
    console.log(err, "message");
    res.redirect("/");
  }
};
