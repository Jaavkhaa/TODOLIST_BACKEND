const express = require("express");
const router = express.Router();

const { userRegister, userLogin } = require("../controller/users");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
