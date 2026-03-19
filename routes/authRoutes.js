const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  loginAdmin,
} = require("../controllers/authController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/admin-login", loginAdmin);

module.exports = router;