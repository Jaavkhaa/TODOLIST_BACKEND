const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");

require("dotenv").config();

const todolist = require("./routes/todolist");
const usersRouter = require("./routes/users");

const app = express();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// view engine setup

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use("/todolist", todolist);
app.use("/users", usersRouter);
app.use(errorHandler);

module.exports = app;
