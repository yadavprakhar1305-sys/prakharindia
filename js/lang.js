(function() {
  const STORAGE_KEY = 'prakhar_lang';

  function setLang(lang) {
    document.body.classList.toggle('hindi', lang === 'hi');
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  let saved = 'en';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch {}
  setLang(saved);
})();
