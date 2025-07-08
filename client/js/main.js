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
  const btn = document.getElementById("get-started-btn");
  const formSection = document.getElementById("create-form");

  if (!btn || !formSection) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Modern scroll behavior for most browsers
    formSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // iOS fallback (especially Safari)
    setTimeout(() => {
      window.scrollTo({
        top: formSection.offsetTop,
        behavior: "smooth",
      });
    }, 0);
  });
}

// Call the function
getStartedBtn();
