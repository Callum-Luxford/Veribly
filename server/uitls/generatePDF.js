const puppeteer = require("puppeteer");

const generateCertificatePDF = async function ({
  name,
  title,
  date,
  signature,
  template,
}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the certificate preview page
  await page.goto("http://localhost:3000/preview-certificate", {
    waitUntil: "networkidle0",
  });

  // Wait for the certificate container
  await page.waitForSelector("#certificate");

  // Get the bounding box of the #certificate element
  const certificate = await page.$("#certificate");
  const clip = await certificate.boundingBox();

  // Generate PDF only of the certificate area
  await page.pdf({
    path: "certificate.pdf",
    printBackground: true,
    width: "1123px",
    height: "794px",
    clip: {
      x: 0,
      y: 0,
      width: 1123,
      height: 794,
    },
  });

  console.log("✅ PDF generated: certificate.pdf");

  await browser.close();
};

module.exports = generateCertificatePDF;
