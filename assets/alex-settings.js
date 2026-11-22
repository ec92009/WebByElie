(() => {
  const root = document.documentElement;
  const dialog = document.querySelector('#settings');
  const trigger = document.querySelector('[data-open-settings]');
  const choices = [...document.querySelectorAll('[data-theme]')].filter(el => el.tagName === 'BUTTON');
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('tilbury-display') || '{}'); } catch {}
  const prefs = {theme: ['day','night','system'].includes(saved.theme) ? saved.theme : 'system', alpha: Math.min(100, Math.max(82, Number(saved.alpha) || 86)), blur: Math.min(24, Math.max(8, Number(saved.blur) || 20))};
  function apply() {
    root.dataset.theme = prefs.theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day') : prefs.theme;
    root.style.setProperty('--alpha', prefs.alpha / 100);
    root.style.setProperty('--blur', `${prefs.blur}px`);
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === prefs.theme)));
    document.querySelector('#alpha').value = prefs.alpha;
    document.querySelector('#blur').value = prefs.blur;
  }
  function save() { try { localStorage.setItem('tilbury-display', JSON.stringify(prefs)); } catch {} }
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(prefs.theme==='system')apply();});
  apply();
  trigger.addEventListener('click', () => dialog.showModal());
  document.querySelector('[data-close-settings]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if(event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => trigger.focus());
  choices.forEach(button => button.addEventListener('click', () => { prefs.theme = button.dataset.theme; apply(); save(); }));
  for (const key of ['alpha', 'blur']) document.querySelector(`#${key}`).addEventListener('input', event => { prefs[key] = Number(event.target.value); apply(); save(); });
  const sticky = document.querySelector('.sticky');
  const hero = document.querySelector('.hero');
  const back = document.querySelector('.back-top');
  const sync = () => { if(sticky && hero) sticky.classList.toggle('visible', hero.getBoundingClientRect().bottom < 0); back?.classList.toggle('visible', window.scrollY > 650); };
  window.addEventListener('scroll', sync, {passive:true});
  sync();
  back?.addEventListener('click', () => { window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); document.querySelector('.brand').focus({preventScroll:true}); });
})();
