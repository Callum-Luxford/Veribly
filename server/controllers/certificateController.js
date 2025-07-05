const path = require("path");
const generateCertificatePDF = require("../utils/generateCertificatePDF");

exports.generateCertificate = async (req, res) => {
  try {
    const { name, title, date, signature, template } = req.body;

    console.log("📦 Received Data:", req.body);

    const filename = `certificate-${Date.now()}.pdf`;

    // ✅ Path must match static route in app.js
    const outputPath = path.join(
      __dirname,
      "..",
      "..",
      "client",
      "generated",
      filename
    );

    await generateCertificatePDF({
      name,
      title,
      date,
      signature,
      template,
      outputPath,
    });

    // URL accessible via static route
    const pdfUrl = `/generated/${filename}`;

    console.log("✅ PDF generated:", outputPath);

    res.json({ url: pdfUrl });
  } catch (error) {
    console.error("❌ Certificate generation failed:", error);
    res.status(500).json({ error: "Certificate generation failed" });
  }
};
