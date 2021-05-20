const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const MyError = require("../utils/myError");

// const paginate = require("../utils/paginate");

exports.userRegister = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Throw a error If one value of firstName, lastName, email, password,
  // role is false.
  if (!firstName || !lastName || !email || !password || !role) {
    throw new MyError("Please fill up all information", 401);
  }

  // If user exists with given email in database, then throw a error.
  const user = await User.findOne({ email: email });
  if (user) {
    throw new MyError("Your email address is already registered", 401);
  }

  let todolist = [];

  // Creating a new user with given req.body in database.
  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    todolist,
  });

  // Send response back to client side.
  res.status(200).json({
    success: true,
    user: createdUser,
    // token: user.getJsonWebToken(),
  });
});

exports.userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("You must write your email and pasword", 400);
  }

  const findUser = await User.findOne({ email: email }).select("+password");

  if (!findUser) {
    throw new MyError("Please write correct email and password", 401);
  }

  const ok = await findUser.checkPassword(password);
  if (!ok) {
    throw new MyError("Your password is wrong desu", 401);
  }

  res.status(200).json({
    success: true,
    token: findUser.getJsonWebToken(),
    user: findUser,
  });
});
