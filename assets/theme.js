(() => {
  const root = document.documentElement;
  const settingsRoot = document.querySelector("[data-site-settings]");
  const settingsKey = "web-by-elie-settings";
  const legacyThemeKey = "web-by-elie-theme";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const defaults = {
    language: "en",
    theme: "day",
    transparency: 86,
    translucency: 24,
  };

  const safeStorage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        return false;
      }
      return true;
    },
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const readSettings = () => {
    const saved = safeStorage.get(settingsKey);
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        parsed = {};
      }
    }

    const legacyTheme = safeStorage.get(legacyThemeKey);
    return {
      language: ["en", "fr", "es"].includes(parsed.language) ? parsed.language : defaults.language,
      theme: parsed.theme === "night" || legacyTheme === "night" ? "night" : defaults.theme,
      transparency: clamp(Number(parsed.transparency) || defaults.transparency, 68, 94),
      translucency: clamp(Number(parsed.translucency) || defaults.translucency, 8, 28),
    };
  };

  let state = readSettings();

  if (settingsRoot && !settingsRoot.querySelector("[data-settings-panel]")) {
    const version = settingsRoot.dataset.siteVersion || "v109.0";
    settingsRoot.insertAdjacentHTML(
      "beforeend",
      `<div class="settings-panel" id="site-settings-panel" role="dialog" aria-label="Site settings" data-settings-panel hidden>
        <div class="settings-panel-head">
          <strong>Settings</strong>
          <button class="settings-close" type="button" data-settings-close aria-label="Close site settings">&times;</button>
        </div>
        <div class="settings-about" aria-label="About">
          <span>About</span>
          <strong data-settings-version>${version}</strong>
        </div>
        <label class="settings-field" for="site-language">
          <span>Language</span>
          <select id="site-language" data-language-select>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </label>
        <div class="settings-field">
          <span>Theme</span>
          <div class="settings-segmented" role="group" aria-label="Theme">
            <button type="button" data-theme-choice="day">Day</button>
            <button type="button" data-theme-choice="night">Night</button>
          </div>
        </div>
        <label class="settings-field" for="site-transparency">
          <span>Transparency <output data-transparency-value for="site-transparency">86%</output></span>
          <input id="site-transparency" type="range" min="68" max="94" step="1" value="86" data-transparency-range />
        </label>
        <label class="settings-field" for="site-translucency">
          <span>Translucency <output data-translucency-value for="site-translucency">24px</output></span>
          <input id="site-translucency" type="range" min="8" max="28" step="1" value="24" data-translucency-range />
        </label>
      </div>`
    );
  }

  const panel = document.querySelector("[data-settings-panel]");
  const toggle = document.querySelector("[data-settings-toggle]");
  const closeButton = document.querySelector("[data-settings-close]");
  const languageSelect = document.querySelector("[data-language-select]");
  const transparencyRange = document.querySelector("[data-transparency-range]");
  const transparencyValue = document.querySelector("[data-transparency-value]");
  const translucencyRange = document.querySelector("[data-translucency-range]");
  const translucencyValue = document.querySelector("[data-translucency-value]");
  const themeChoices = Array.from(document.querySelectorAll("[data-theme-choice]"));

  const saveSettings = () => {
    safeStorage.set(settingsKey, JSON.stringify(state));
  };

  const applyTheme = () => {
    root.dataset.theme = state.theme;
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", state.theme === "night" ? "#111a20" : "#f7faf7");
    }

    themeChoices.forEach((choice) => {
      const isActive = choice.dataset.themeChoice === state.theme;
      choice.classList.toggle("is-active", isActive);
      choice.setAttribute("aria-pressed", String(isActive));
    });
  };

  const applyLanguage = () => {
    root.lang = state.language;
    root.dataset.language = state.language;
    if (languageSelect) {
      languageSelect.value = state.language;
    }
  };

  const applyGlass = () => {
    const alpha = state.transparency / 100;
    const surfaceAlpha = clamp(alpha * 0.68, 0.46, 0.64);
    const glassAlpha = clamp(alpha * 0.5, 0.34, 0.48);
    const glassStrongAlpha = clamp(alpha * 0.82, 0.56, 0.77);
    const darkAlpha = clamp(alpha * 0.16, 0.1, 0.16);

    root.style.setProperty("--glass-alpha", alpha.toFixed(2));
    root.style.setProperty("--surface-glass-alpha", surfaceAlpha.toFixed(2));
    root.style.setProperty("--glass", `rgba(255, 255, 255, ${glassAlpha.toFixed(2)})`);
    root.style.setProperty("--glass-strong", `rgba(255, 255, 255, ${glassStrongAlpha.toFixed(2)})`);
    root.style.setProperty("--glass-dark-alpha", darkAlpha.toFixed(2));
    root.style.setProperty("--glass-blur", `${state.translucency}px`);

    if (transparencyRange && transparencyValue) {
      transparencyRange.value = String(state.transparency);
      transparencyValue.value = `${state.transparency}%`;
      transparencyValue.textContent = `${state.transparency}%`;
    }

    if (translucencyRange && translucencyValue) {
      translucencyRange.value = String(state.translucency);
      translucencyValue.value = `${state.translucency}px`;
      translucencyValue.textContent = `${state.translucency}px`;
    }
  };

  const applySettings = () => {
    applyTheme();
    applyLanguage();
    applyGlass();
  };

  const setPanelOpen = (open) => {
    if (!panel || !toggle) {
      return;
    }

    panel.hidden = !open;
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));

    if (open) {
      window.setTimeout(() => {
        const focusTarget = panel.querySelector("select, button, input");
        if (focusTarget) {
          focusTarget.focus({ preventScroll: true });
        }
      }, 0);
    } else {
      toggle.focus({ preventScroll: true });
    }
  };

  const isPanelOpen = () => panel && !panel.hidden;

  applySettings();

  if (toggle && panel && settingsRoot) {
    toggle.addEventListener("click", () => {
      setPanelOpen(!isPanelOpen());
    });

    if (closeButton) {
      closeButton.addEventListener("click", () => setPanelOpen(false));
    }

    document.addEventListener("pointerdown", (event) => {
      if (isPanelOpen() && !settingsRoot.contains(event.target)) {
        setPanelOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isPanelOpen()) {
        setPanelOpen(false);
      }
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      state = { ...state, language: languageSelect.value };
      applyLanguage();
      saveSettings();
    });
  }

  themeChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      state = { ...state, theme: choice.dataset.themeChoice === "night" ? "night" : "day" };
      applyTheme();
      saveSettings();
    });
  });

  if (transparencyRange) {
    transparencyRange.addEventListener("input", () => {
      state = { ...state, transparency: clamp(Number(transparencyRange.value), 68, 94) };
      applyGlass();
      saveSettings();
    });
  }

  if (translucencyRange) {
    translucencyRange.addEventListener("input", () => {
      state = { ...state, translucency: clamp(Number(translucencyRange.value), 8, 28) };
      applyGlass();
      saveSettings();
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
