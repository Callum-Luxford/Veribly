import initMenu from "./menu.js";
import initHeaderGlass from "./header.js";
import handlePreviewForm from "./preview-form.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeaderGlass();
});

handlePreviewForm();
