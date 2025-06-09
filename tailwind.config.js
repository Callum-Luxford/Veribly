/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./server/views/**/*.ejs", "./client/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        theme_clr_1: "var(--theme-clr-1)", // dark green
        theme_clr_2: "var(--theme-clr-2)", // mid green
        theme_clr_3: "var(--theme-clr-3)", // light accent green
        button_clr_1: "var(--button-clr-1)", // primary CTA green
        text_clr_1: "var(--font-clr-1)", // light text
        text_clr_2: "var(--font-clr-2)", // subtle text
        text_clr_3: "var(--font-clr-3)", // subtle text
        text_dark: "var(--text-dark)", // black text on white bg
        bg_light: "var(--bg-light)", // white cards/navbar
        border_muted: "var(--border-muted)", // card borders
      },
      fontSize: {
        "2xs": "var(--font-size-2xs)",
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
        "7xl": "var(--font-size-7xl)",
        "8xl": "var(--font-size-8xl)",
        "9xl": "var(--font-size-9xl)",
        "10xl": "var(--font-size-10xl)",
        "11xl": "var(--font-size-11xl)",
        "12xl": "var(--font-size-12xl)",
      },
      boxShadow: {
        "2xs": "var(--shadow-2xs)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        focus: "var(--shadow-focus)",
        success: "var(--shadow-success)",
        warning: "var(--shadow-warning)",
        danger: "var(--shadow-danger)",
        info: "var(--shadow-info)",
      },
      backgroundImage: {
        gradient_1: "var(--bg-gradient-1)",
      },
      fontFamily: {
        base: "var(--font-family-base)",
      },
      zIndex: {
        "-5": "-5",
        "-10": "-10",
        100: "100",
        200: "200",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
