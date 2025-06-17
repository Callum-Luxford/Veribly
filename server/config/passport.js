// Modules
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Try finding by googleId first
        let user = await User.findOne({ googleId: profile.id });

        // If not found, try matching by email
        if (!user) {
          const email = profile.emails[0].value;
          user = await User.findOne({ email });

          if (user) {
            // ✅ User exists, link Google ID
            user.googleId = profile.id;
            await user.save();
          } else {
            // ❌ No existing user at all — create new one
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
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
