(() => {
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");
  const storageKey = "web-by-elie-theme";

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
})();
