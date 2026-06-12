(() => {
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");
  const storageKey = "web-by-elie-theme";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (button) {
      const next = theme === "night" ? "Day" : "Night";
      button.textContent = next;
      button.setAttribute("aria-label", `Switch to ${next.toLowerCase()} mode`);
    }
  };

  const saved = localStorage.getItem(storageKey);
  applyTheme(saved === "night" ? "night" : "day");

  if (button) {
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "night" ? "day" : "night";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  const revealSelectors = [
    ".demo-hero > div",
    ".demo-photo",
    ".studio-services article",
    ".section-head",
    ".work-steps article",
    ".about-layout > div",
    ".about-copy",
    ".savings-layout > div",
    ".savings-list",
    ".budget-layout > div",
    ".budget-list",
    ".signoff-box",
    ".policy-card"
  ];

  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    const revealItems = Array.from(document.querySelectorAll(revealSelectors.join(",")));
    root.classList.add("reveal-ready");

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, {
      rootMargin: "-8% 0px -12% 0px",
      threshold: 0.16
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
