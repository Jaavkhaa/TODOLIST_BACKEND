const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");

exports.updateToDoList = asyncHandler(async (req, res, next) => {
  const { token, todolist } = req.body;

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  userId = payload.id;

  const user = await User.updateOne(
    { _id: userId },
    { $set: { todolist: todolist } }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getToDoList = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization");
  const selectedStatus = req.header("selectedStatus");

  if (!token) {
    throw new MyError("You don`t have any token", 401);
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  userId = payload.id;

  // Search user with given userId from database.

  const user = await User.findOne({ _id: userId });
  let userToDo = user.todolist;

  if (selectedStatus !== "Filter your tasks") {
    var yvuulah = [];
    userToDo.map((el) => {
      if (el.status === selectedStatus) {
        yvuulah.push(el);
      }
    });
  }

  res.status(200).json({
    success: true,
    user: yvuulah == undefined ? userToDo : yvuulah,
  });
});

exports.adminToDoList = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization");

  // Verify token and give a decoded value to payload.
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  userId = payload.id;

  // Find user and update to do lists.
  const adminUser = await User.findOne({ _id: userId });
  const user = await User.find();

  if (!user) {
    throw new MyError("No one is registered in this website", 401);
  }

  res.status(200).json({
    success: true,
    user: user,
    role: adminUser.role,
  });
});
