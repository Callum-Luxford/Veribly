// Modules
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log(`Error: No user found!`);
          return done(null, false, { message: "No user found" });
        }
        console.log(`User found.`);
        console.log(`Comparing passwords...`);
        const isPassMatch = await user.comparePassword(password);
        if (isPassMatch) {
          console.log(`Password match!`);
          return done(null, user);
        } else {
          console.log(`Error: Passwords do not match!`);
          return done(null, false, { message: "Passwords do not match" });
        }
      } catch (error) {
        console.error("Authentication error:", error.message);
        done(error);
      }
    }
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  console.log(`Serializing user:`, user.id);
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  console.log(`Deserializing user:`, id);
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user);
    done(null, user);
  } catch (error) {
    console.error(`Error in deserialization:`, error);
    console.log(`Error with deserialization:`, error.message);
    done(error);
  }
});
