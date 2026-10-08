/* De site blijft bruikbaar zonder JavaScript; afbeeldingen openen dan rechtstreeks. */
(() => {
  const dialog = document.querySelector('#project-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('.preview-caption');
  document.querySelectorAll('.project-image').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = image.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('.preview-close').addEventListener('click', () => dialog.close());
})();
