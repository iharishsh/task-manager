const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup); // Signup
router.post("/login", login); // Login

module.exports = router;