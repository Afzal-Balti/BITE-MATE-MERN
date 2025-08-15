const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongooseDB");

const registerUser = require("./Routers/registerUser");
const loginUser = require("./Routers/loginUser");
const productRouter = require("./Routers/productModel");
const cookieParser = require("cookie-parser");

const app = express();

connectDB().catch((err) => console.error("Database connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", express.static("upload"));
app.use(cookieParser());

app.use("/create", registerUser);
app.use("/login", loginUser);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello MERN");
});

app.post("/logout", (req, res) => {
  res.send("token", "");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
