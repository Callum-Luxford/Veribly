export default function initHeaderGlass() {
  const header = document.getElementById("site-header");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      header.classList.add(
        "backdrop-blur-md",
        "bg-black/40", // semi-transparent dark background
        "border-b",
        "border-white/10", // subtle white border
        "shadow-sm"
      );
    } else {
      header.classList.remove(
        "backdrop-blur-md",
        "bg-black/40", // semi-transparent dark background
        "border-b",
        "border-white/10", // subtle white border
        "shadow-sm"
      );
    }
  });
}
