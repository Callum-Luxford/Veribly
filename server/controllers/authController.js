// Modules
const User = require("../models/User");
const passport = require("passport");

// Route-Controllers:
// GET /*
// GET / LOGIN
exports.renderLogin = (req, res) => {
  res.render("auth/login");
};

// GET / REGISTER
exports.renderRegister = (req, res) => {
  res.render("auth/register");
};

// GET / LOGOUT
exports.logout = (req, res) => {};

// POST /*
// POST / LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.user;
  try {
  } catch (error) {}
};

// POST / REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered");
      return res.redirect("/auth/register");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        console.error("Login error after registration:", err);
        req.flash("error", "Login failed after registration");
        return res.redirect("/auth/login");
      }

      req.flash("Success", "You're logged in.");
      res.redirect("home/index");
    });
  } catch (error) {
    console.error("Registration error:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/auth/register");
  }
};
