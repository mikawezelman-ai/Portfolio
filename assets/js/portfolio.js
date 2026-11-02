/* Geen automatisch afspelen: de bezoeker bepaalt het tempo. */
(() => {
  const data = window.portfolioGalleries || {};
  const dialog = document.querySelector('#project-preview');
  const canPreview = dialog && typeof dialog.showModal === 'function';
  let active = null;
  let opener = null;

  function button(label, text, className) {
    const el = document.createElement('button');
    el.type = 'button'; el.className = className;
    el.setAttribute('aria-label', label); el.textContent = text;
    return el;
  }
  function showImage(stage, slide) {
    stage.replaceChildren();
    const empty = () => {
      const p = document.createElement('p'); p.className = 'gallery-empty';
      p.textContent = slide.src ? 'Deze afbeelding is nog niet beschikbaar.' : 'Screenshot volgt';
      stage.replaceChildren(p);
    };
    if (!slide.src) { empty(); return; }
    const img = document.createElement('img');
    img.alt = slide.alt || slide.caption;
    img.addEventListener('error', empty, { once: true });
    img.src = slide.src;
    stage.append(img);
  }
  function renderPreview() {
    if (!active) return;
    const slide = active.slides[active.index];
    showImage(dialog.querySelector('.preview-stage'), slide);
    dialog.querySelector('.preview-caption').textContent = `${active.index + 1} / ${active.slides.length} · ${slide.caption}`;
    dialog.querySelector('.gallery-prev').disabled = active.slides.length < 2;
    dialog.querySelector('.gallery-next').disabled = active.slides.length < 2;
  }
  function move(state, step) {
    state.index = (state.index + step + state.slides.length) % state.slides.length;
    state.render();
    if (active === state && dialog.open) renderPreview();
  }
  function keyboard(event, state) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(state, event.key === 'ArrowLeft' ? -1 : 1);
    }
  }
  document.querySelectorAll('[data-gallery]').forEach(root => {
    const slides = data[root.dataset.gallery];
    if (!Array.isArray(slides) || !slides.length) return;
    const state = { slides, index: 0 };
    const stage = root.querySelector('.gallery-stage');
    root.tabIndex = 0;
    const controls = document.createElement('div'); controls.className = 'gallery-controls';
    const previous = button('Vorige afbeelding', '←', 'gallery-prev');
    const next = button('Volgende afbeelding', '→', 'gallery-next');
    const status = document.createElement('p'); status.className = 'gallery-status';
    status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    controls.append(previous, status, next);
    const enlarge = button('Afbeelding vergroten', 'Vergroten ↗', 'gallery-enlarge');
    root.append(controls);
    if (canPreview) root.append(enlarge);
    state.render = () => {
      const slide = slides[state.index];
      showImage(stage, slide);
      status.textContent = `${state.index + 1} / ${slides.length} · ${slide.caption}`;
      enlarge.disabled = !slide.src;
      previous.disabled = next.disabled = slides.length < 2;
    };
    previous.addEventListener('click', () => move(state, -1));
    next.addEventListener('click', () => move(state, 1));
    root.addEventListener('keydown', e => keyboard(e, state));
    enlarge.addEventListener('click', () => {
      active = state; opener = enlarge;
      renderPreview(); dialog.showModal();
    });
    let touch = null;
    stage.addEventListener('touchstart', e => {
      touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    }, { passive: true });
    stage.addEventListener('touchcancel', () => { touch = null; });
    stage.addEventListener('touchend', e => {
      if (!touch || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - touch.x;
      const dy = e.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(state, dx < 0 ? 1 : -1);
    }, { passive: true });
    state.render();
  });
  if (canPreview) {
    dialog.querySelector('.preview-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.gallery-prev').addEventListener('click', () => active && move(active, -1));
    dialog.querySelector('.gallery-next').addEventListener('click', () => active && move(active, 1));
    dialog.addEventListener('keydown', e => active && keyboard(e, active));
    dialog.addEventListener('close', () => { opener?.focus(); active = null; });
  }
})();
