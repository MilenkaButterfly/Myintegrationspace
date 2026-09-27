const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const smallScreen = window.matchMedia('(max-width: 740px)');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.dataset.collapsed = String(smallScreen.matches && !open);
}
function resizeMenu() { menu.hidden = !smallScreen.matches; setMenu(!smallScreen.matches); }
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', e => { if (e.target.closest('a') && smallScreen.matches) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && smallScreen.matches && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
smallScreen.addEventListener('change', resizeMenu);
resizeMenu();
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
// Missing photos remain clearly marked. Add the named file in images/ and refresh.
document.querySelectorAll('.photo img').forEach(img => {
  function missing() {
    img.closest('.photo').classList.add('is-missing');
    img.closest('.photo').querySelector('.missing-caption').hidden = false;
  }
  img.addEventListener('error', missing);
  if (img.complete && img.naturalWidth === 0) missing();
});
