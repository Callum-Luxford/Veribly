const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { generateCertificate } = require("../controllers/certificateController");

router.post("/generate-certificate", upload.none(), generateCertificate);

module.exports = router;
