const opener = document.querySelector('#ajustes');
const panel = document.querySelector('#panel');
const theme = document.querySelector('#tema');
const opacity = document.querySelector('#opacidad');
const blur = document.querySelector('#desenfoque');
const key = 'web-by-elie-preview-settings';

function apply() {
  document.documentElement.dataset.theme = theme.value;
  document.documentElement.style.setProperty('--opacity', Number(opacity.value) / 100);
  document.documentElement.style.setProperty('--blur', blur.value + 'px');
}

try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && ['system', 'day', 'night'].includes(saved.theme)) {
    theme.value = saved.theme;
    opacity.value = saved.opacity;
    blur.value = saved.blur;
  }
} catch { /* Settings are optional. */ }

panel.addEventListener('input', () => {
  apply();
  try {
    localStorage.setItem(key, JSON.stringify({ theme: theme.value, opacity: opacity.value, blur: blur.value }));
  } catch { /* Changes still apply for this visit. */ }
});
opener.addEventListener('click', () => panel.showModal());
panel.addEventListener('close', () => opener.focus());
panel.addEventListener('click', (event) => {
  const bounds = panel.getBoundingClientRect();
  if (event.target === panel && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) panel.close();
});
apply();
