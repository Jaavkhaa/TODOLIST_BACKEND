const express = require("express");
const router = express.Router();

const {
  getToDoList,
  updateToDoList,
  adminToDoList,
} = require("../controller/todolist");

router.route("/").get(getToDoList).post(updateToDoList);
router.route("/admin").get(adminToDoList);

module.exports = router;
