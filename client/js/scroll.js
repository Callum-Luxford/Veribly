const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  let currentScroll = 0;
  let targetScroll = 0;
  const ease = 0.035;

  function setBodyHeight() {
    const fullHeight = scrollWrapper.scrollHeight;
    document.body.style.height = `${fullHeight}px`;
  }

  window.isScrollLocked = false;

  function smoothScroll() {
    if (!window.isScrollLocked) {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * ease;

      const maxScroll = scrollWrapper.scrollHeight - window.innerHeight;
      currentScroll = Math.min(currentScroll, maxScroll);

      scrollWrapper.style.transform = `translateY(-${currentScroll}px)`;
    }

    requestAnimationFrame(smoothScroll);
  }

  window.addEventListener("load", () => {
    // ✅ Enable scrolling simulation on desktop only
    scrollWrapper.style.position = "fixed";
    scrollWrapper.style.top = "0";
    scrollWrapper.style.left = "0";
    scrollWrapper.style.width = "100%";
    scrollWrapper.style.zIndex = "0";

    setBodyHeight();
    smoothScroll();
  });

  window.addEventListener("resize", setBodyHeight);
}
