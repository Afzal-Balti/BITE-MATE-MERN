const express = require("express");
const authRouter = express.Router();
const {
  getLoginUser,
  createUser,
  UserlogOut,
  getAllUser,
} = require("../controller/auth-controller");
const isAdminMiddleWare = require("../Middleware/isAdmin");

authRouter.post("/login", getLoginUser);

authRouter.post("/create", createUser);

authRouter.post("/logout", UserlogOut);

authRouter.get("/admin", getAllUser);

module.exports = authRouter;
