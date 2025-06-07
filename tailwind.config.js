/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./server/views/**/*.ejs", "./client/js/**/*.js"], // Adjust to your files,
  theme: {
    extend: {
      colors: {
        theme_clr_1: "var(--theme-clr-1)",
        theme_clr_2: "var(--theme-clr-2)",
        theme_clr_3: "var(--theme-clr-3)",
        theme_clr_4: "var(--theme-clr-4)",
      },
      backgroundImage: {
        gradient_1: "var(--bg-gradient-1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
