function initMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const openIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  function isMenuOpen() {
    return navMenu.classList.contains("translate-x-0");
  }

  function toggleMenu() {
    navMenu.classList.toggle("translate-x-full");
    navMenu.classList.toggle("translate-x-0");
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
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
