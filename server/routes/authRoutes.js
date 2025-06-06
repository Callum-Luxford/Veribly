// Modules
const express = require("express");
const {
  renderLogin,
  renderRegister,
  logout,
  login,
  register,
} = require("../controllers/authController");

// Router
const router = express.Router();

// Routes:
// GET /*
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/logout", logout);

module.exports = router;
