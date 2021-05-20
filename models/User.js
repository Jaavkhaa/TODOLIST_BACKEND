const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please write your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please write your last name"],
  },
  email: {
    type: String,
    required: [true, "Please write your email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Please write your role"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please write your role"],
    enum: ["User", "Admin"],
    default: "user",
  },
  todolist: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  return token;
};

UserSchema.methods.checkPassword = function (enteredPassword) {
  return enteredPassword === this.password ? true : false;
};

module.exports = mongoose.model("User", UserSchema);
