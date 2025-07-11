particlesJS("particles-js", {
  particles: {
    number: { value: 20 },
    color: { value: "#a259ff" },
    shape: { type: "circle" },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 0.1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        size_min: 1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: false, mode: "repulse" } },
  },
});
