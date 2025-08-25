const express = require("express");

const createUser = require("../controller/createuser-controller");

const registerUser = express.Router();

registerUser.post("/", createUser);

module.exports = registerUser;
