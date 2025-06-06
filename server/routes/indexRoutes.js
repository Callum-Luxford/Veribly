// Modules
const express = require("express");
const { renderHome } = require("../controllers/indexController");

// Router
const router = express.Router();

// Routes:
// GET / Home
router.get("/", renderHome);

module.exports = router;
