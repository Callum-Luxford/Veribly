const express = require("express");
const router = express.Router();

router.get("/preview-certificate", (req, res) => {
  const { name, title, date, signature } = req.query;

  res.render("classic-certificate", {
    layout: false,
    name,
    title,
    date,
    signature,
  });
});

module.exports = router;
