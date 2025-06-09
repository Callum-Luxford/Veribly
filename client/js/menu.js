function initMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const openIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  function isMenuOpen() {
    return navMenu.classList.contains("translate-x-0");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains("translate-x-0");

    if (isOpen) {
      // MENU IS CLOSING

      // rotate class to close icon before hiding
      closeIcon.classList.add("rotate-90");

      // Slide menu out
      navMenu.classList.remove("translate-x-0");
      navMenu.classList.add("translate-x-full");

      // Wait for transition + rotation to complete
      setTimeout(() => {
        closeIcon.classList.remove("rotate-90");
        closeIcon.classList.add("hidden");
        openIcon.classList.remove("hidden");
      }, 300); // matches Tailwind's duration-300
    } else {
      // MENU IS OPENING

      navMenu.classList.remove("translate-x-full");
      navMenu.classList.add("translate-x-0");

      openIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  }

  // Toggle on icon click
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents bubbling so the document listener doesn’t also fire
    toggleMenu();
  });

  // Close on outside click or nav link click
  document.addEventListener("click", (e) => {
    const clickedInside =
      navMenu.contains(e.target) || menuToggle.contains(e.target);

    // 1. Close if menu is open and click was outside
    if (!clickedInside && isMenuOpen()) {
      toggleMenu();
    }

    // 2. Close if link inside nav was clicked
    if (isMenuOpen() && e.target.closest("#nav-menu a")) {
      toggleMenu();
    }
  });
}

export default initMenu;
