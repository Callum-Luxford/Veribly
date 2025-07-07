const express = require("express");
const router = express.Router();
const layoutConfig = require("../config/templateLayoutConfig");

function formatDate(rawDate) {
  if (!rawDate || typeof rawDate !== "string" || !rawDate.includes("-")) {
    return "Invalid Date";
  }

  const [yearStr, monthStr, dayStr] = rawDate.split("-");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Invalid Date";
  }

  const suffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateObj = new Date(year, month - 1, day);
  const monthName = dateObj.toLocaleString("en-GB", { month: "long" });
  const dayWithSuffix = `${day}${suffix(day)}`;

  return `${dayWithSuffix} ${monthName} ${year}`;
}

router.get("/preview-certificate", (req, res) => {
  const {
    name = "Recipient Name",
    title = "Certificate of Completion",
    date = "2025-01-01",
    signature = "Authorized Signature",
    template = "certificate-4",
  } = req.query;

  const imageName = `${template}.png`;
  const layout = layoutConfig[imageName] || layoutConfig.default;

  const formattedDate = formatDate(date);

  // ✅ CONFIRM WHAT IS BEING SENT
  console.log("🎯 Sending layout config to EJS:", layout);
  console.log("🧩 Selected template:", template);
  console.log("🧩 Layout config applied:", layout);

  res.render("classic-certificate", {
    layout: false,
    name,
    title,
    date: formattedDate,
    signature,
    template: imageName,
    layoutConfig: layout,
  });
});

module.exports = router;
