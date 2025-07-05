const express = require("express");
const router = express.Router();

router.get("/preview-certificate", (req, res) => {
  const { name, title, date, signature, template } = req.query;

  res.render("classic-certificate", {
    layout: false,
    name,
    title,
    date,
    signature,
    template: `${template}.png`,
  });
});

module.exports = router;
