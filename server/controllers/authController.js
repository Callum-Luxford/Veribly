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
// GET / LOGOUT
exports.logout = (req, res, next) => {
  console.log("✅ Logout route hit");

  console.log("Current user before logout:", req.user);
  console.log("Current session ID:", req.sessionID);
  console.log("Current session object:", req.session);

  const sid = req.sessionID;

  req.logout((err) => {
    if (err) {
      console.log("❌ Error during req.logout");
      return next(err);
    }

    console.log("✅ Passport logout complete");

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("❌ Session destruction error:", err);
          return next(err);
        }

        console.log("✅ Session destroyed from memory");

        // Force-delete from Mongo Store
        req.sessionStore.destroy(sid, (err) => {
          if (err) {
            console.error(
              "❌ Failed to destroy session from MongoDB store:",
              err
            );
          } else {
            console.log("✅ Session force-deleted from MongoDB store");
          }

          res.clearCookie("connect.sid");
          res.redirect("/auth/login");
        });
      });
    } else {
      console.log("⚠️ No session found to destroy");
      res.clearCookie("connect.sid");
      res.redirect("/auth/login");
    }
  });
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
      res.redirect("/");
    });
  } catch (error) {
    console.error("Registration error:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/auth/register");
  }
};
