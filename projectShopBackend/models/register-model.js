const mongo = require("mongoose");

const registerSchema = new mongo.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Only Gmail addresses are allowed (example@gmail.com)",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongo.model("register", registerSchema);
