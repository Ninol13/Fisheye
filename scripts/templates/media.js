/**
 * Créée un élément média DOM, selon qu'il s'agisse d'une image ou d'une vidéo.
 * @param {Object} item      — Données brutes du média (image, video, title, likes).
 * @param {string} folderName— Nom du dossier du photographe (prénom uniquement).
 */

function createMediaElement(item, folderName) {
  const { image, video, title } = item;
  const filename = image || video;
  const srcPath  = `assets/media/${folderName}/${filename}`;

  if (image) {
    const img = document.createElement('img');
    img.src        = srcPath;
    img.alt        = title;
    img.style.cursor = 'pointer';
    return img;
  } else {
    const videoEl = document.createElement('video');
    videoEl.muted = true;
    videoEl.loop  = true;
    videoEl.style.cursor = 'pointer';
    const src = document.createElement('source');
    src.src  = srcPath;
    src.type = 'video/mp4';
    videoEl.appendChild(src);
    return videoEl;
  }
}

/**
 * Factory Method : construit la carte média complète (<article>),
 * avec vignette image/vidéo, titre et bouton de like
 */
export function mediaFactory(item, photographer) {
  const { title } = item;
  const folderName = photographer.name.split(' ')[0];

  // initialise l’état liked sur l’objet pour persister
  if (typeof item.liked === 'undefined') {
    item.liked = false;
  }

  function getMediaCardDOM() {
    // on lit toujours la valeur courante dans item.likes
    let likesCount = item.likes;

    const article = document.createElement('article');
    article.className = 'media-card';

    // 1. Preview média (image ou vidéo)
    const mediaEl = createMediaElement(item, folderName);
    article.appendChild(mediaEl);

    // 2. Bloc info (titre + bouton like)
    const info = document.createElement('div');
    info.className = 'media-info';

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.tabIndex   = 0;

    const likeBtn = document.createElement('button');
    likeBtn.className     = 'like-button';
    likeBtn.setAttribute('aria-pressed', String(item.liked));
    likeBtn.setAttribute('aria-label', `J’aime ${title}`);
    likeBtn.textContent   = `${likesCount} ❤`;

    likeBtn.addEventListener('click', e => {
      e.stopPropagation();

      // toggle du like et mise à jour persistante
      if (!item.liked) {
        item.likes++;
      } else {
        item.likes--;
      }
      item.liked = !item.liked;

      // mise à jour du bouton et du compteur local
      likesCount = item.likes;
      likeBtn.setAttribute('aria-pressed', String(item.liked));
      likeBtn.textContent = `${likesCount} ❤`;

      // mise à jour du total global…
      const totalEl = document.querySelector('.total-likes-count');
      if (totalEl) {
        const current = parseInt(totalEl.textContent, 10);
        totalEl.textContent = item.liked ? current + 1 : current - 1;
      }
    });

    info.append(titleEl, likeBtn);
    article.appendChild(info);

    return article;
  }

  return { getMediaCardDOM };
}
