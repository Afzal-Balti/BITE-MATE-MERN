const express = require("express");
const loginUser = express.Router();
const getLoginUser = require("../controller/Login-controller");

loginUser.get("/", (req, res) => {
  res.send("the Register User is --------");
});

loginUser.post("/", getLoginUser);

module.exports = loginUser;
