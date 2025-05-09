// scripts/pages/photographer.js
import { getPhotographers } from './index.js';
import { mediaFactory } from '../templates/media.js';
import { displayModal, closeModal } from '../utils/contactForm.js';
import { initLightbox } from '../utils/lightbox.js';

/**
 * Factory pour créer et configurer la section de tri
 */
function sortSectionFactory(options, onSortChange) {
  const section = document.createElement('section');
  section.className = 'sort-section';

  const label = document.createElement('span');
  label.className = 'sort-label';
  label.textContent = 'Trier par : ';
  section.append(label);

  const listbox = document.createElement('ul');
  listbox.id = 'filter__list-items';
  listbox.setAttribute('role', 'listbox');
  listbox.className = 'selector__list';
  listbox.tabIndex = -1;
  listbox.setAttribute('aria-labelledby', 'filter__title');

  const toggle = document.createElement('button');
  toggle.id = 'filter__toggle';
  toggle.className = 'selector__toggle';
  toggle.setAttribute('aria-haspopup', 'listbox');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-labelledby', 'filter__title filter__option1');

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.textContent = 'expand_more';
  toggle.append(icon);

  // initialise label sur le toggle
  const defaultOpt = options.find(o => o.selected) || options[0];
  toggle.insertAdjacentText('afterbegin', defaultOpt.label + ' ');

  // créer les options
  options.forEach(opt => {
    const li = document.createElement('li');
    li.id = opt.id;
    li.setAttribute('role', 'option');
    li.className = 'selector__item';
    if (opt.selected) {
      li.classList.add('selected');
      li.setAttribute('aria-selected', 'true');
    }
    li.tabIndex = 0;  // rendre focusable
    li.dataset.filterOption = opt.value;
    li.setAttribute('aria-labelledby', `filter__title ${opt.id}`);
    li.textContent = opt.label;

    li.addEventListener('click', () => {
      // mise à jour du toggle
      toggle.textContent = opt.label + ' ';
      toggle.append(icon);

      // visuel sélection
      listbox.querySelectorAll('li').forEach(n => {
        n.classList.toggle('selected', n === li);
        n.removeAttribute('aria-selected');
      });
      li.setAttribute('aria-selected', 'true');

      // fermeture
      toggle.setAttribute('aria-expanded', 'false');
      listbox.classList.remove('active');

      // callback tri
      onSortChange(opt.value);
      toggle.focus();
    });

    // navigation clavier sur les options
    li.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = li.nextElementSibling || listbox.querySelector('li');
        next.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = li.previousElementSibling || listbox.querySelector('li:last-child');
        prev.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        li.click();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleList();
        toggle.focus();
      }
    });

    listbox.append(li);
  });

  // assemble
  listbox.insertBefore(toggle, listbox.firstChild);
  section.append(listbox);

  function toggleList() {
    const exp = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!exp));
    listbox.classList.toggle('active');
  }

  // click et clavier sur le toggle pour ouvrir/fermer
  toggle.addEventListener('click', toggleList);
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleList();
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && listbox.classList.contains('active')) {
      e.preventDefault();
      const first = listbox.querySelector('li');
      first.focus();
    }
  });

  return section;
}

async function initPhotographerPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  const { photographers, media } = await getPhotographers();
  const photographer = photographers.find(p => p.id === id);
  const baseMedia = media.filter(m => m.photographerId === id);

  displayPhotographerHeader(photographer);

  let sortedMedia = [...baseMedia].sort((a, b) => b.likes - a.likes);

  const options = [
    { id: 'filter__option1', label: 'Popularité', value: 'popularity', selected: true },
    { id: 'filter__option2', label: 'Date',        value: 'date'       },
    { id: 'filter__option3', label: 'Titre',       value: 'title'      }
  ];
  const sortSec = sortSectionFactory(options, mode => {
    if (mode === 'popularity') sortedMedia.sort((a,b)=>b.likes - a.likes);
    else if (mode === 'date')   sortedMedia.sort((a,b)=>new Date(b.date) - new Date(a.date));
    else if (mode === 'title')  sortedMedia.sort((a,b)=>a.title.localeCompare(b.title));
    updateGalleryAndLightbox();
  });
  document.querySelector('#main')
          .insertBefore(sortSec, document.querySelector('.media-gallery'));

  function updateGalleryAndLightbox() {
    displayMediaGallery(sortedMedia, photographer);
    const old = document.getElementById('lightbox');
    if (old) old.remove();
    const lightboxAPI = initLightbox(sortedMedia, photographer.name.split(' ')[0]);
    bindLightbox(lightboxAPI);
  }
  updateGalleryAndLightbox();

  const contactBtn = document.querySelector('.photograph-header .contact_button');
  contactBtn.addEventListener('click', () => displayModal(photographer.name));
  document.querySelector('#contact_modal .modal-close')
          .addEventListener('click', closeModal);

  initStickySummary(baseMedia, photographer);

  function bindLightbox(lightboxAPI) {
    document.querySelectorAll('.media-gallery article').forEach((card, idx) => {
      card.dataset.index = idx;
      card.style.cursor  = 'pointer';
      card.tabIndex      = 0;
      card.onclick       = () => lightboxAPI.open(idx);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightboxAPI.open(idx);
        }
      });
    });
  }
}

function displayPhotographerHeader(photographer) {
  const container = document.querySelector('.photograph-header');
  const btn = container.querySelector('.contact_button');
  container.innerHTML = '';

  const info = document.createElement('div');
  info.className = 'profile-info';
  const h1 = document.createElement('h1');
  h1.textContent = photographer.name; h1.tabIndex = 0;
  const pLoc = document.createElement('p');
  pLoc.className = 'photographer-info__location';
  pLoc.textContent = `${photographer.city}, ${photographer.country}`;
  const pTag = document.createElement('p');
  pTag.className = 'photographer-info__tagline';
  pTag.textContent = photographer.tagline;
  info.append(h1, pLoc, pTag);

  const img = document.createElement('img');
  img.className = 'profile-picture';
  img.src = `assets/photographers/${photographer.portrait}`;
  img.alt = `Portrait de ${photographer.name}`;

  container.append(info, btn, img);
}

function displayMediaGallery(arr, photographer) {
  const gallery = document.querySelector('.media-gallery');
  gallery.innerHTML = '';
  arr.forEach(item => {
    const { getMediaCardDOM } = mediaFactory(item, photographer);
    gallery.appendChild(getMediaCardDOM());
  });
}

function initStickySummary(arr, photographer) {
  const total = arr.reduce((sum,m)=>sum+m.likes,0);
  document.querySelector('.total-likes-count').textContent = total;
  document.querySelector('.photographer-rate').textContent = `${photographer.price}€`;
}

initPhotographerPage();
