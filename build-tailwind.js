const fs = require("fs");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss")("./tailwind.config.js"); // explicit config load
const autoprefixer = require("autoprefixer");

console.log("🔁 Running build-tailwind.js...");

fs.readFile("./client/css/tailwind.css", (err, css) => {
  if (err) throw err;

  console.log("📥 Reading tailwind.css");

  postcss([tailwindcss, autoprefixer])
    .process(css, {
      from: "./client/css/tailwind.css",
      to: "./client/css/root.css",
    })
    .then((result) => {
      fs.writeFileSync("./client/css/root.css", result.css);
      console.log("✅ Tailwind CSS built");
    });
});
