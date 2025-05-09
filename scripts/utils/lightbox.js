/**
 * Factory method to create and manage a lightbox for a photographer’s media.
 * @param {Array} mediaArray — Liste des médias (objets avec .image or .video, .title, etc.)
 * @param {string} photographerName — Nom (prénom) du photographe, utilisé comme dossier
 * @returns {Object} Un objet { open, close, next, prev } pour piloter la lightbox
 */

export function initLightbox(mediaArray, photographerName) {
  // 1. Construire le wrapper de la lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Agrandissement des médias');
  Object.assign(lightbox.style, {
    display: 'none',
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2000',
  });

  // 2. Boutons de contrôle
  const btnClose = document.createElement('button');
  btnClose.className = 'lightbox-close';
  btnClose.setAttribute('aria-label', 'Fermer la lightbox');
  btnClose.innerHTML = '&times;';
  Object.assign(btnClose.style, {
    position: 'absolute', top: '30px', right: '70px',
    background: 'none', border: 'none',
    color: '#901C1C', fontSize: '62px', cursor: 'pointer'
  });

  const btnPrev = document.createElement('button');
  btnPrev.className = 'lightbox-prev';
  btnPrev.setAttribute('aria-label', 'Image précédente');
  btnPrev.innerHTML = '&#10094;';
  Object.assign(btnPrev.style, {
    position: 'absolute', left: '30px', top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', border: 'none',
    color: '#901C1C', fontSize: '50px', cursor: 'pointer'
  });

  const btnNext = document.createElement('button');
  btnNext.className = 'lightbox-next';
  btnNext.setAttribute('aria-label', 'Image suivante');
  btnNext.innerHTML = '&#10095;';
  Object.assign(btnNext.style, {
    position: 'absolute', right: '50px', top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', border: 'none',
    color: '#901C1C', fontSize: '50px', cursor: 'pointer'
  });

  // 3. Conteneur du média
  const container = document.createElement('div');
  container.className = 'lightbox-media-container';
  Object.assign(container.style, {
    width: '67vw', height: '80vh',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', overflow: 'hidden'
  });

  // 4. Ajout dans le DOM
  lightbox.append(btnClose, btnPrev, container, btnNext);
  document.body.appendChild(lightbox);

  // 5. Variables d'état
  let currentIndex = 0;

  // 6. Fonctions internes
  function update() {
    container.innerHTML = '';
    const item = mediaArray[currentIndex];
    let node;
    if (item.image) {
      node = document.createElement('img');
      node.src = `assets/media/${photographerName}/${item.image}`;
      node.alt = item.title;
    } else {
      node = document.createElement('video');
      node.controls = true;
      const src = document.createElement('source');
      src.src = `assets/media/${photographerName}/${item.video}`;
      src.type = 'video/mp4';
      node.appendChild(src);
    }
    Object.assign(node.style, { maxWidth: '100%', maxHeight: '100%' });
    container.appendChild(node);
  }

  function open(idx) {
    currentIndex = idx;
    update();
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function close() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function prev() {
    currentIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
    update();
  }

  function next() {
    currentIndex = (currentIndex + 1) % mediaArray.length;
    update();
  }

  // 7. Handlers
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  document.addEventListener('keydown', e => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') close();
    }
  });

  // 8. Exposer l’API de la lightbox
  return { open, close, prev, next };
}
