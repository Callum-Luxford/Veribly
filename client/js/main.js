import initMenu from "./menu.js";
import initHeaderGlass from "./header.js";
import { handlePreviewForm, handleCertificateSubmit } from "./preview-form.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeaderGlass();
  handlePreviewForm();
  handleCertificateSubmit();
});
