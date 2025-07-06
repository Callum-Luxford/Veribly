import initMenu from "./menu.js";
import initHeaderGlass from "./header.js";
import { handlePreviewForm, handleCertificateSubmit } from "./preview-form.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeaderGlass();
  handlePreviewForm();
  handleCertificateSubmit();
  getStartedBtn();
});

function getStartedBtn() {
  document.getElementById("get-started-btn").addEventListener("click", (e) => {
    e.preventDefault(); // prevent default anchor behavior

    const targetSection = document.getElementById("create-form");

    if (targetSection && !isTouchDevice) {
      const targetOffset =
        targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetOffset,
        behavior: "instant", // no smooth here — it's handled manually
      });
    } else {
      // Fallback for mobile or if smoothScroll not active
      targetSection?.scrollIntoView({ behavior: "smooth" });
    }
  });
}
