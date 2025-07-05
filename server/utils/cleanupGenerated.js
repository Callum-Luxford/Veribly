const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

async function cleanupOldFiles() {
  const cleanupPath = path.join(__dirname, "../../client/generated");

  const files = await fs.promises.readdir(cleanupPath);

  console.log("Running cleanup task..");
  console.log(files);

  for (const file of files) {
    const filePath = path.join(cleanupPath, file);
    const stats = await fs.promises.stat(filePath);
    const ageInMs = Date.now() - stats.mtime.getTime();
    const ageInMinutes = ageInMs / (1000 * 60);

    console.log(file, ageInMinutes);

    const thresholdMinutes = 5;
    if (ageInMinutes > thresholdMinutes) {
      await fs.promises.unlink(filePath);
      console.log("Deleted:", file);
    }
  }
}

module.exports = cleanupOldFiles;
