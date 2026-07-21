(() => {
  const root = document.documentElement;
  const settings = document.querySelector("[data-settings]");
  const toggle = document.querySelector("[data-settings-toggle]");
  const panel = document.querySelector("[data-settings-panel]");
  const close = document.querySelector("[data-settings-close]");
  const language = document.querySelector("[data-language]");
  const alpha = document.querySelector("[data-alpha]");
  const alphaOutput = document.querySelector("[data-alpha-output]");
  const blur = document.querySelector("[data-blur]");
  const blurOutput = document.querySelector("[data-blur-output]");
  const themeChoices = [...document.querySelectorAll("[data-theme-choice]")];
  const mobileCta = document.querySelector(".mobile-cta");
  const hero = document.querySelector(".hero");
  const storageKey = "web-by-elie-case-study-settings";
  const defaults = { language: "en", theme: "day", alpha: 86, blur: 22 };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return {
        language: ["en", "fr", "es"].includes(saved.language) ? saved.language : defaults.language,
        theme: saved.theme === "night" ? "night" : defaults.theme,
        alpha: clamp(Number(saved.alpha) || defaults.alpha, 68, 94),
        blur: clamp(Number(saved.blur) || defaults.blur, 8, 28),
      };
    } catch {
      return { ...defaults };
    }
  };
  let state = load();

  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Storage may be unavailable. */ }
  };
  const apply = () => {
    root.lang = state.language;
    root.dataset.theme = state.theme;
    root.style.setProperty("--glass-alpha", (state.alpha / 100).toFixed(2));
    root.style.setProperty("--glass-blur", `${state.blur}px`);
    language.value = state.language;
    alpha.value = String(state.alpha);
    alphaOutput.textContent = `${state.alpha}%`;
    blur.value = String(state.blur);
    blurOutput.textContent = `${state.blur}px`;
    themeChoices.forEach((choice) => choice.setAttribute("aria-pressed", String(choice.dataset.themeChoice === state.theme)));
    document.querySelector('meta[name="theme-color"]').content = state.theme === "night" ? "#171816" : "#f5f1e9";
  };
  const setPanel = (open) => {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) panel.querySelector("select, button, input")?.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", () => setPanel(panel.hidden));
  close.addEventListener("click", () => setPanel(false));
  document.addEventListener("pointerdown", (event) => {
    if (!panel.hidden && !settings.contains(event.target)) setPanel(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setPanel(false);
  });
  language.addEventListener("change", () => { state.language = language.value; apply(); save(); });
  alpha.addEventListener("input", () => { state.alpha = Number(alpha.value); apply(); save(); });
  blur.addEventListener("input", () => { state.blur = Number(blur.value); apply(); save(); });
  themeChoices.forEach((choice) => choice.addEventListener("click", () => {
    state.theme = choice.dataset.themeChoice === "night" ? "night" : "day";
    apply();
    save();
  }));

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "-6% 0px -8%", threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  }

  const syncMobileCta = () => mobileCta.classList.toggle("is-visible", hero.getBoundingClientRect().bottom < 120);
  window.addEventListener("scroll", syncMobileCta, { passive: true });
  apply();
  syncMobileCta();
})();
