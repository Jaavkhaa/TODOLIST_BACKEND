const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoListSchema = new Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  update: { type: String, required: true },
});

const ToDoListSchema = mongoose.model("ToDoList", ToDoListSchema);

module.exports = ToDoListSchema;
