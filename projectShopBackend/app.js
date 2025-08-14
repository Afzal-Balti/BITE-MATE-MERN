const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongooseDB");

const registerUser = require("./Routers/registerUser");
const loginUser = require("./Routers/loginUser");
const productRouter = require("./Routers/productModel");

const app = express();

connectDB().catch((err) => console.error("Database connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", express.static("upload"));

app.use(registerUser);
app.use(loginUser);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello MERN");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
