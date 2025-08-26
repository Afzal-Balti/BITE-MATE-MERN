const express = require("express");
const authRouter = express.Router();
const {
  getLoginUser,
  createUser,
  UserlogOut,
} = require("../controller/auth-controller");

authRouter.post("/login", getLoginUser);

authRouter.post("/create", createUser);

authRouter.post("/logout", UserlogOut);

module.exports = authRouter;
