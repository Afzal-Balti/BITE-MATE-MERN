const express = require("express");
const UserlogOut = require("../controller/userlogout-controller");
const logoutUser = express.Router();

logoutUser.post("/", UserlogOut);

module.exports = logoutUser;
