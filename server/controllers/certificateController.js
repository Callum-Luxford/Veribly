const { generatPDF } = require("../uitls/generatePDF");
const path = require("path");

exports.generateCertificate = async (req, res) => {
  const { name, title, date, signature, template } = req.body;

  const filename = `certificate-${Date.now()}.pdf`;
  const outputPath = path.join(__dirname, "../client/generated", filename);

  try {
    await generatPDF({
      name,
      title,
      date,
      signature,
      template,
      path: outputPath,
    });

    res.json({ url: `/generated/${filename}` });
  } catch (error) {
    console.error("Certificate generation failed:", error);
    res.status(500).json({ error: "Failed to generate certificate." });
  }
};
