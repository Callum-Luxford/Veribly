function handlePreviewForm() {
  const templateBoxes = document.querySelectorAll(
    ".card-gradient-border-template"
  );
  const hiddenInput = document.getElementById("selectedTemplate");

  templateBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      // Remove highlight from all boxes
      templateBoxes.forEach((el) =>
        el.classList.remove("card-gradient-border-template-active")
      );

      // Add highlight to the clicked box
      box.classList.add("card-gradient-border-template-active");

      // Try to find data-template on the box or its children
      let template = box.dataset.template;
      if (!template) {
        const childWithData = box.querySelector("[data-template]");
        if (childWithData) {
          template = childWithData.dataset.template;
        }
      }

      // Update hidden input and log
      hiddenInput.value = template || "";
      console.log("✅ Selected template:", hiddenInput.value);
    });
  });
}

export default handlePreviewForm;
