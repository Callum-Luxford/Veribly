require("dotenv").config();
const puppeteer = require("puppeteer");
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const generateCertificatePDF = async function ({
  name,
  title,
  date,
  signature,
  template,
  outputPath,
}) {
  const isProduction = process.env.NODE_ENV === "production";

  const browser = await puppeteer.launch(
    isProduction
      ? {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--font-render-hinting=none",
          ],
        }
      : {} // Let Puppeteer handle local Chromium path
  );

  const page = await browser.newPage();

  const query = new URLSearchParams({
    name,
    title,
    date,
    signature,
    template,
  }).toString();

  await page.goto(`${BASE_URL}/preview-certificate?${query}`, {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector("#certificate");

  const certificate = await page.$("#certificate");

  await page.pdf({
    path: outputPath,
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

  console.log("✅ PDF generated:", outputPath);

  await browser.close();
};

module.exports = generateCertificatePDF;
