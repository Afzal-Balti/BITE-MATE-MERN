const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongooseDB");
const expressonSession = require("express-session");
const registerUser = require("./Routers/registerUser");
const loginUser = require("./Routers/loginUser");
const productRouter = require("./Routers/productModel");
const stripeRouter = require("./Routers/stripePayment");
const logOut = require("./Routers/logout");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const logoutUser = require("./Routers/logout");

require("dotenv").config();

const app = express();

connectDB().catch((err) => console.error("Database connection error:", err));

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", express.static("upload"));
app.use(cookieParser());

app.use(
  expressonSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/create", registerUser);
app.use("/login", loginUser);
app.use("/products", productRouter);
app.use("/logout", logoutUser);
app.use("/payment", stripeRouter);

app.get("/", (req, res) => {
  res.send("HELLO SERVER ---");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
