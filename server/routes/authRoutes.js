// Modules
const express = require("express");
const {
  renderLogin,
  renderRegister,
  logout,
  login,
  register,
} = require("../controllers/authController");
const passport = require("passport");

// Router
const router = express.Router();

// Routes:
// GET /*
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/logout", logout);

// POST /*
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
router.post("/register", register);

module.exports = router;
