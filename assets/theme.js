(() => {
  const root = document.documentElement;
  const settingsRoot = document.querySelector("[data-site-settings]");
  const settingsKey = "web-by-elie-settings";
  const legacyThemeKey = "web-by-elie-theme";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const translations = window.webByElieI18n || {};
  const supportedLanguages = ["en", "fr", "es"];
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
  const getPathParts = () => window.location.pathname.split("/").filter(Boolean);
  const pageLanguage = () => {
    const pathLanguage = getPathParts()[0];
    if (supportedLanguages.includes(root.lang)) {
      return root.lang;
    }
    if (supportedLanguages.includes(pathLanguage)) {
      return pathLanguage;
    }
    return defaults.language;
  };

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
      language: supportedLanguages.includes(parsed.language) ? parsed.language : pageLanguage(),
      theme: parsed.theme === "night" || legacyTheme === "night" ? "night" : defaults.theme,
      transparency: clamp(Number(parsed.transparency) || defaults.transparency, 68, 94),
      translucency: clamp(Number(parsed.translucency) || defaults.translucency, 8, 28),
    };
  };

  let state = readSettings();

  if (settingsRoot && !settingsRoot.querySelector("[data-settings-panel]")) {
    const version = settingsRoot.dataset.siteVersion || "v143.5";
    settingsRoot.insertAdjacentHTML(
      "beforeend",
      `<div class="settings-panel" id="site-settings-panel" role="dialog" aria-label="Site settings" data-settings-panel hidden>
        <div class="settings-panel-head">
          <strong data-settings-label="title">Settings</strong>
          <button class="settings-close" type="button" data-settings-close aria-label="Close site settings">&times;</button>
        </div>
        <div class="settings-about" aria-label="About">
          <span data-settings-label="about">About</span>
          <strong data-settings-version>${version}</strong>
        </div>
        <label class="settings-field" for="site-language">
          <span data-settings-label="language">Language</span>
          <select id="site-language" data-language-select>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </label>
        <div class="settings-field">
          <span data-settings-label="theme">Theme</span>
          <div class="settings-segmented" role="group" aria-label="Theme">
            <button type="button" data-theme-choice="day">Day</button>
            <button type="button" data-theme-choice="night">Night</button>
          </div>
        </div>
        <label class="settings-field" for="site-transparency">
          <span><span data-settings-label="transparency">Transparency</span> <output data-transparency-value for="site-transparency">86%</output></span>
          <input id="site-transparency" type="range" min="68" max="94" step="1" value="86" data-transparency-range />
        </label>
        <label class="settings-field" for="site-translucency">
          <span><span data-settings-label="translucency">Translucency</span> <output data-translucency-value for="site-translucency">24px</output></span>
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

  const getCopy = () => translations[state.language] || translations.en || {};
  const getSiteVersion = () => (settingsRoot && settingsRoot.dataset.siteVersion) || "v143.5";
  const setAllText = (selector, value) => {
    if (value === undefined) {
      return;
    }
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };
  const setText = (selector, value) => {
    if (value === undefined) {
      return;
    }
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  };
  const setAttribute = (selector, attr, value) => {
    if (value === undefined) {
      return;
    }
    const node = document.querySelector(selector);
    if (node) {
      node.setAttribute(attr, value);
    }
  };
  const setListText = (selector, values) => {
    if (!values) {
      return;
    }
    document.querySelectorAll(selector).forEach((node, index) => {
      if (values[index] !== undefined) {
        node.textContent = values[index];
      }
    });
  };
  const setListHtml = (selector, values) => {
    if (!values) {
      return;
    }
    document.querySelectorAll(selector).forEach((node, index) => {
      if (values[index] !== undefined) {
        node.innerHTML = values[index];
      }
    });
  };
  const getPageKey = () => {
    const parts = getPathParts();
    const fileName = parts[parts.length - 1] || "index.html";
    const pageName = fileName === "index.html" && parts.length > 1 ? parts[parts.length - 2] : fileName.replace(/\.html$/, "");
    if (pageName === "privacy") {
      return "privacy";
    }
    if (pageName === "terms") {
      return "terms";
    }
    if (pageName === "data-deletion") {
      return "deletion";
    }
    return "home";
  };

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

  const applyTranslations = () => {
    const copy = getCopy();
    const common = copy.common || {};
    const settings = copy.settings || {};
    const page = (copy.pages && copy.pages[getPageKey()]) || {};
    const version = getSiteVersion();

    setAllText('.nav a[href="#services"], .nav a[href="./#services"], .nav a[href="../#services"], .nav a[href="index.html#services"]', common.navServices);
    setAllText('.nav a[href="#process"], .nav a[href="./#process"], .nav a[href="../#process"], .nav a[href="index.html#process"]', common.navProcess);
    setAllText('.nav a[href="#contact"], .nav a[href="./#contact"], .nav a[href="../#contact"], .nav a[href="index.html#contact"]', common.navContact);
    setAllText('.footer-links a[href="privacy"], .footer-links a[href="../privacy"], .footer-links a[href="privacy.html"], .nav a[href="privacy"], .nav a[href="../privacy"], .nav a[href="privacy.html"]', common.privacy);
    setAllText('.footer-links a[href="terms"], .footer-links a[href="../terms"], .footer-links a[href="terms.html"], .nav a[href="terms"], .nav a[href="../terms"], .nav a[href="terms.html"]', common.terms);
    setAllText('.footer-links a[href="data-deletion"], .footer-links a[href="../data-deletion"], .footer-links a[href="data-deletion.html"], .nav a[href="data-deletion"], .nav a[href="../data-deletion"], .nav a[href="data-deletion.html"]', common.dataDeletion);
    setAllText(".footer-inner > span", (common.versionLine || "Web By Elie · {version}").replace("{version}", version));

    setAttribute("[data-settings-toggle]", "aria-label", settings.open);
    setAttribute("[data-settings-panel]", "aria-label", settings.panel);
    setAttribute("[data-settings-close]", "aria-label", settings.close);
    setText('[data-settings-label="title"]', settings.title);
    setText('[data-settings-label="about"]', settings.about);
    setText('[data-settings-label="language"]', settings.language);
    setText('[data-language-select] option[value="en"]', settings.english);
    setText('[data-language-select] option[value="fr"]', settings.french);
    setText('[data-language-select] option[value="es"]', settings.spanish);
    setText('[data-settings-label="theme"]', settings.theme);
    setAttribute(".settings-segmented", "aria-label", settings.theme);
    setText('[data-theme-choice="day"]', settings.day);
    setText('[data-theme-choice="night"]', settings.night);
    setText('[data-settings-label="transparency"]', settings.transparency);
    setText('[data-settings-label="translucency"]', settings.translucency);

    document.querySelectorAll("[data-email-link]").forEach((link) => {
      if (common.emailSubject) {
        link.dataset.emailSubject = common.emailSubject;
      }
      if (!link.dataset.emailLabel && common.emailCta) {
        link.textContent = common.emailCta;
      }
    });

    if (page.title) {
      document.title = page.title;
    }
    setAttribute('meta[name="description"]', "content", page.description);

    if (getPageKey() === "home") {
      setAttribute(".demo-photo img", "alt", page.imageAlt);
      setText(".demo-hero .eyebrow", page.heroEyebrow);
      setText(".demo-hero h1", page.heroTitle);
      setText(".demo-hero .lede", page.heroLede);
      setText(".demo-hero .button.secondary", page.seeServices);
      setListText(".studio-services article h2", (page.services || []).map((item) => item[0]));
      setListText(".studio-services article p", (page.services || []).map((item) => item[1]));
      setText("#process .section-head .eyebrow", page.processEyebrow);
      setText("#process .section-head h2", page.processTitle);
      setText("#process .section-head .lede", page.processLede);
      setListText(".work-steps article h3", (page.steps || []).map((item) => item[0]));
      setListText(".work-steps article p", (page.steps || []).map((item) => item[1]));
      setText("#work .section-head .eyebrow", page.workEyebrow);
      setText("#work .section-head h2", page.workTitle);
      setText("#work .section-head .lede", page.workLede);
      document.querySelectorAll(".work-card").forEach((card, index) => {
        const item = (page.workExamples || [])[index];
        if (!item) return;
        const links = card.querySelectorAll(".work-links .text-link");
        card.querySelector(".work-role").textContent = item.role;
        card.querySelector("h3").textContent = item.title;
        card.querySelector(".work-body > p:not(.work-detail)").textContent = item.summary;
        card.querySelector(".work-detail").textContent = item.detail;
        if (links[0]) {
          links[0].textContent = item.cta;
          links[0].href = item.url;
        }
        if (links[1] && item.caseStudyUrl) {
          links[1].textContent = item.caseStudyCta;
          links[1].href = item.caseStudyUrl;
        }
      });
      setText(".about-layout .eyebrow", page.aboutEyebrow);
      setText(".about-layout h2", page.aboutTitle);
      setListText(".about-copy p", page.aboutCopy);
      setText(".savings-layout .eyebrow", page.savingsEyebrow);
      setText(".savings-layout h2", page.savingsTitle);
      setListHtml(".savings-list p", page.savings);
      setText(".budget-layout .eyebrow", page.budgetEyebrow);
      setText(".budget-layout h2", page.budgetTitle);
      setListHtml(".budget-list p", page.budget);
      setText("#answers .section-head .eyebrow", page.answersEyebrow);
      setText("#answers .section-head h2", page.answersTitle);
      setText("#answers .section-head .lede", page.answersLede);
      setListText(".answer-list article h3", (page.answers || []).map((item) => item[0]));
      setListText(".answer-list article p", (page.answers || []).map((item) => item[1]));
      setText("#contact .eyebrow", page.contactEyebrow);
      setText("#contact h2", page.contactTitle);
      return;
    }

    setText(".policy-card .eyebrow", page.eyebrow);
    setText(".policy-card h1", page.heading);
    setListHtml(".policy-card > p:not(.eyebrow)", page.paragraphs);
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
    applyTranslations();
    applyGlass();
    applyEmailLinks();
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
      applySettings();
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

  function applyEmailLinks() {
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
