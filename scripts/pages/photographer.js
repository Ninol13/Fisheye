// scripts/pages/photographer.js
import { getPhotographers } from './index.js';
import { mediaFactory } from '../templates/media.js';

async function initPhotographerPage() {
  // 1. Récupérer l’ID depuis l’URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  // 2. Charger les données photographes + médias
  const { photographers, media } = await getPhotographers();

  // 3. Trouver le photographe courant et ses médias
  const photographer = photographers.find(p => p.id === id);
  const photographerMedia = media.filter(m => m.photographerId === id);

  // 4. Afficher le header (infos, bouton, portrait)
  displayPhotographerHeader(photographer);

  // 5. Afficher la galerie
  displayMediaGallery(photographerMedia, photographer);

  // 6. Initialiser le résumé (likes + tarif)
  initStickySummary(photographerMedia, photographer);
}

function displayPhotographerHeader(photographer) {
  const headerContainer = document.querySelector('.photograph-header');

  // 1 Récupérer d'abord le bouton Contactez-moi (avant de vider le container)
  const contactButton = headerContainer.querySelector('.contact_button');

  // 2 Vider le container (on gardera le bouton en mémoire)
  headerContainer.innerHTML = '';

  // 3 Créer le bloc d'infos (nom, lieu, tagline)
  const infoDiv = document.createElement('div');
  infoDiv.className = 'profile-info';
  const nameEl = document.createElement('h1');
  nameEl.textContent = photographer.name;
  nameEl.tabIndex = 0;
  const locationEl = document.createElement('p');
  locationEl.textContent = `${photographer.city}, ${photographer.country}`;
  locationEl.className = 'photographer-info__location';
  const taglineEl = document.createElement('p');
  taglineEl.textContent = photographer.tagline;
  taglineEl.className = 'photographer-info__tagline';
  infoDiv.append(nameEl, locationEl, taglineEl);

  // 4 Créer l'image de portrait
  const portrait = document.createElement('img');
  portrait.className = 'profile-picture';
  portrait.src = `assets/photographers/${photographer.portrait}`;
  portrait.alt = `Portrait de ${photographer.name}`;

  // 5 Placer dans l’ordre : infos, bouton, portrait
  headerContainer.append(infoDiv, contactButton, portrait);
}

function displayMediaGallery(mediaArray, photographer) {
  const gallery = document.querySelector('.media-gallery');
  gallery.innerHTML = '';

  mediaArray.forEach(item => {
    const { getMediaCardDOM } = mediaFactory(item, photographer);
    gallery.appendChild(getMediaCardDOM());
  });
}

function initStickySummary(mediaArray, photographer) {
  const totalLikes = mediaArray.reduce((sum, m) => sum + m.likes, 0);
  document.querySelector('.total-likes-count').textContent = totalLikes;
  document.querySelector('.photographer-rate').textContent = `${photographer.price}€`;
}

initPhotographerPage();
