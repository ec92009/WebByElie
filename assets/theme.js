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

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    const user = link.dataset.emailUser || "hello";
    const domain = link.dataset.emailDomain || "web-by-elie.com";
    const subject = link.dataset.emailSubject;
    const address = `${user}@${domain}`;
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";

    link.href = `mailto:${address}${query}`;
    if (link.dataset.emailLabel === "address") {
      link.textContent = address;
    }
  });

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
      const cardGroup = item.closest(".studio-services, .work-steps");
      const groupItems = cardGroup ? Array.from(cardGroup.querySelectorAll("article")) : [];
      const delayIndex = groupItems.length ? groupItems.indexOf(item) : index % 3;

      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.max(delayIndex, 0) * 70}ms`);
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

  const stickyCta = document.querySelector(".mobile-sticky-cta");
  const hero = document.querySelector(".demo-hero");

  if (stickyCta && hero) {
    const syncStickyCta = () => {
      stickyCta.classList.toggle("is-visible", hero.getBoundingClientRect().bottom < 120);
    };

    syncStickyCta();
    window.addEventListener("scroll", syncStickyCta, { passive: true });
    window.addEventListener("resize", syncStickyCta);
  }
})();
