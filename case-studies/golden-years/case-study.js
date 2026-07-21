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
  const storageKey = "web-by-elie-settings";
  const legacyStorageKey = "web-by-elie-case-study-settings";
  const defaults = { language: "en", theme: "day", transparency: 86, translucency: 24 };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey) || "{}");
      return {
        language: ["en", "fr", "es"].includes(saved.language) ? saved.language : defaults.language,
        theme: saved.theme === "night" ? "night" : defaults.theme,
        transparency: clamp(Number(saved.transparency ?? saved.alpha) || defaults.transparency, 68, 94),
        translucency: clamp(Number(saved.translucency ?? saved.blur) || defaults.translucency, 8, 28),
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
    const surfaceAlpha = clamp((state.transparency / 100) * 0.68, 0.46, 0.64);
    root.lang = state.language;
    root.dataset.language = state.language;
    root.dataset.theme = state.theme;
    root.style.setProperty("--glass-alpha", (state.transparency / 100).toFixed(2));
    root.style.setProperty("--surface-alpha", surfaceAlpha.toFixed(2));
    root.style.setProperty("--glass-blur", `${state.translucency}px`);
    language.value = state.language;
    alpha.value = String(state.transparency);
    alphaOutput.textContent = `${state.transparency}%`;
    blur.value = String(state.translucency);
    blurOutput.textContent = `${state.translucency}px`;
    themeChoices.forEach((choice) => choice.setAttribute("aria-pressed", String(choice.dataset.themeChoice === state.theme)));
    document.querySelector('meta[name="theme-color"]').content = state.theme === "night" ? "#111a20" : "#f7faf7";
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
  alpha.addEventListener("input", () => { state.transparency = Number(alpha.value); apply(); save(); });
  blur.addEventListener("input", () => { state.translucency = Number(blur.value); apply(); save(); });
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
  window.addEventListener("resize", syncMobileCta);
  apply();
  syncMobileCta();
})();
