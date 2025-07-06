function handlePreviewForm() {
  const downloadBtn = document.getElementById("download-link");
  const generateBtn = document.getElementById("generate-new");

  function toggleButtons(active, inactive) {
    active.classList.add("btn-primary");
    active.classList.remove("btn-secondary");
    inactive.classList.add("btn-secondary");
    inactive.classList.remove("btn-primary");
  }

  function reset() {
    toggleButtons(downloadBtn, generateBtn);
  }

  // DRY hover toggle setup
  function setupHoverToggle(button, otherButton) {
    button.addEventListener("mouseenter", () =>
      toggleButtons(button, otherButton)
    );
    button.addEventListener("mouseleave", reset);
  }

  setupHoverToggle(generateBtn, downloadBtn);
  setupHoverToggle(downloadBtn, generateBtn);

  const templateBoxes = document.querySelectorAll(
    ".card-gradient-border-template"
  );
  const hiddenInput = document.getElementById("selectedTemplate");

  // Set default selection on load
  const defaultBox = document.querySelector(
    '.card-gradient-border-template[data-template="certificate-1"]'
  );
  if (defaultBox) {
    defaultBox.classList.add("card-gradient-border-template-active");
    hiddenInput.value = "certificate-1"; // also set the hidden input
    console.log("Default template set:", hiddenInput.value);
  }

  templateBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // Remove active class from all
      templateBoxes.forEach((el) =>
        el.classList.remove("card-gradient-border-template-active")
      );

      // Add active class to clicked box
      box.classList.add("card-gradient-border-template-active");

      // Get template value
      let template = box.dataset.template;
      if (!template) {
        const childWithData = box.querySelector("[data-template]");
        if (childWithData) {
          template = childWithData.dataset.template;
        }
      }

      hiddenInput.value = template || "";
      console.log("Selected template:", hiddenInput.value);
    });
  });
}

function handleCertificateSubmit() {
  function showCertificatePreview(pdfUrl) {
    const formWrapper = document.getElementById("form-wrapper");
    const previewArea = document.getElementById("preview-area");
    const pdfIframe = document.getElementById("pdf-preview");
    const downloadButton = document.getElementById("download-link");

    formWrapper.classList.add("hidden");
    previewArea.classList.remove("hidden");
    pdfIframe.src = pdfUrl;
    downloadButton.href = pdfUrl;

    function updateScrollHeightSafely() {
      if (typeof setBodyHeight === "function") {
        setTimeout(() => setBodyHeight(), 100);
      }
    }
    updateScrollHeightSafely();
  }

  const homeCertForm = document.getElementById("home-cert-form");

  // SUBMIT HANDLER
  homeCertForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(homeCertForm);
    const url = `/api/generate-certificate`;

    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const pdfUrl = data.url;

      showCertificatePreview(pdfUrl);
    } catch (error) {}
  });

  // GENERATE NEW HANDLER (OUTSIDE of submit!)
  document.getElementById("generate-new").addEventListener("click", () => {
    const formWrapper = document.getElementById("form-wrapper");
    const previewArea = document.getElementById("preview-area");
    const pdfIframe = document.getElementById("pdf-preview");
    const certForm = document.getElementById("home-cert-form");

    formWrapper.classList.remove("hidden");
    previewArea.classList.add("hidden");
    pdfIframe.src = "";
    certForm.reset();

    // Re-select the default template box visually
    const defaultBox = document.querySelector(
      '.card-gradient-border-template[data-template="certificate-1"]'
    );
    if (defaultBox) {
      // Remove any active state from all boxes
      document
        .querySelectorAll(".card-gradient-border-template")
        .forEach((el) =>
          el.classList.remove("card-gradient-border-template-active")
        );

      // Add active class and set value
      defaultBox.classList.add("card-gradient-border-template-active");
      document.getElementById("selectedTemplate").value = "certificate-1";
    }
  });
}

export { handlePreviewForm, handleCertificateSubmit };
