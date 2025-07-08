function initMenu() {
  if (typeof window.isScrollLocked === "undefined") {
    window.isScrollLocked = false;
  }
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const openIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  let scrollPosition = 0;

  function getScrollbarWidth() {
    const width = window.innerWidth - document.documentElement.clientWidth;
    return width > 0 ? width : 15;
  }

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  function enableScrollWrapperFix() {
    if (scrollWrapper) {
      scrollWrapper.style.position = "fixed";
      scrollWrapper.style.top = "0";
      scrollWrapper.style.left = "0";
      scrollWrapper.style.width = "100%";
      scrollWrapper.style.zIndex = "0";
    }
  }

  function disableScrollWrapperFix() {
    if (scrollWrapper) {
      scrollWrapper.style.position = "";
      scrollWrapper.style.top = "";
      scrollWrapper.style.left = "";
      scrollWrapper.style.width = "";
      scrollWrapper.style.zIndex = "";
    }
  }

  function lockScroll() {
    scrollPosition = window.scrollY;

    const scrollbarWidth = getScrollbarWidth();
    console.log("Scrollbar width:", scrollbarWidth); // Check in console

    document.body.classList.add("lock-scroll");
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.documentElement.classList.add("no-scroll");

    const overlay = document.getElementById("nav-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
      overlay.classList.add("fixed", "inset-0");
      overlay.style.top = `0`;
    }

    if (isTouchDevice()) {
      enableScrollWrapperFix();
    }
  }

  function unlockScroll() {
    document.body.classList.remove("lock-scroll");
    document.body.style.top = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    document.documentElement.classList.remove("no-scroll");

    window.scrollTo(0, scrollPosition);

    const overlay = document.getElementById("nav-overlay");
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.style.top = "0";
    }

    if (isTouchDevice()) {
      disableScrollWrapperFix();
    }
  }

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
