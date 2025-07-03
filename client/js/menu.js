function initMenu() {
  if (typeof window.isScrollLocked === "undefined") {
    window.isScrollLocked = false;
  }
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const openIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  const lockScroll = () => {
    document.body.classList.add("lock-scroll");
  };

  const unlockScroll = () => {
    document.body.classList.remove("lock-scroll");
  };

  function isMenuOpen() {
    return navMenu.classList.contains("translate-x-0");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains("translate-x-0");

    if (isOpen) {
      // MENU IS CLOSING
      closeIcon.classList.add("rotate-90");
      navMenu.classList.remove("translate-x-0");
      navMenu.classList.add("translate-x-full");

      setTimeout(() => {
        closeIcon.classList.remove("rotate-90");
        closeIcon.classList.add("hidden");
        openIcon.classList.remove("hidden");
      }, 300);

      unlockScroll();
      window.isScrollLocked = false;
    } else {
      // MENU IS OPENING
      navMenu.classList.remove("translate-x-full");
      navMenu.classList.add("translate-x-0");

      openIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");

      lockScroll();
      window.isScrollLocked = true;
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
