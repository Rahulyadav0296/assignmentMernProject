const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

User.method({
  async authenticate(password) {
    return bcrypt.compare(password, this.hash_password);
  },
});

module.exports = mongoose.model("User", User);
