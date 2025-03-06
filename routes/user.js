const express = require("express");
const router = express.Router();

const {
  customer_register,
  validate_otp,
  admin_login,
} = require("../service/user.service");

router.route("/customer/user").post(customer_register);
router.route("/validate/otp").post(validate_otp);
router.route("/admin/login").post(admin_login);

module.exports = router;
