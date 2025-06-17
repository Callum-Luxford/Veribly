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

// Google OAuth entry point
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("✅ Google redirected to /auth/google/callback");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    failureMessage: true,
  }),
  (req, res) => {
    console.log("✅ Google OAuth success, user:", req.user);
    res.redirect("/");
  }
);

// POST /*
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  (req, res) => {
    console.log("✅ Google OAuth success, user:", req.user);
    res.redirect("/");
  }
);
router.post("/register", register);

module.exports = router;
