// Modules
require("dotenv").config();
const express = require("express");
const db = require("../server/config/db");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Connect to db
db();

// App create
const app = express();

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Set view engine + view directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware: Parsing URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Static folder
app.use(express.static(path.join(__dirname, "../client")));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

// Passport:
require("./config/passport");
// Init Passport
app.use(passport.initialize());
// Connect passport to session
app.use(passport.session());

// Example route
app.get("/", (req, res) => {
  res.render("home/index", { title: "Welcome to CertifyMe", user: null });
});

// App start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
