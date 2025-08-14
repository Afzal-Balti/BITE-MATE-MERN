const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/PracticeProject");
    console.log(" Connected to MongoDB successfully");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
