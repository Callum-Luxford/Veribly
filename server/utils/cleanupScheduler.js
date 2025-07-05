const cron = require("node-cron");
const cleanupOldFiles = require("./cleanupGenerated");

cron.schedule("*/5 * * * *", () => {
  cleanupOldFiles();
});
