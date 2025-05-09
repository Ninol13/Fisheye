// scripts/templates/photographer.js

/**
 * Sous-factory pour créer le lien cliquable vers la page détail
 */
function createPhotographerLink({ id, name, picturePath }) {
  const link = document.createElement('a');
  link.href = `photographer.html?id=${id}`;
  link.setAttribute('aria-label', name);

  const img = document.createElement('img');
  img.src = picturePath;
  img.className = 'photographer-portrait';
  img.alt = name;
  link.append(img);

  const h2 = document.createElement('h2');
  h2.textContent = name;
  link.append(h2);

  return link;
}

/**
 * Sous-factory pour créer le bloc d’infos (ville, tagline, prix)
 */
function createPhotographerInfo({ city, country, tagline, price }) {
  const fragment = document.createDocumentFragment();

  const pLoc = document.createElement('p');
  pLoc.className = 'photographer-location';
  pLoc.textContent = `${city}, ${country}`;
  fragment.append(pLoc);

  const pTag = document.createElement('p');
  pTag.className = 'photographer-tagline';
  pTag.textContent = tagline;
  fragment.append(pTag);

  const pPrice = document.createElement('p');
  pPrice.className = 'photographer-price';
  pPrice.textContent = `${price}€/jour`;
  fragment.append(pPrice);

  return fragment;
}

/**
 * Factory Method principal : produit un DOM complet pour un photographe
 */
export function photographerTemplate(photographer) {
  const {
    name,
    id,
    city,
    country,
    tagline,
    price,
    portrait
  } = photographer;

  const picturePath = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    // 1) Lien + portrait + nom
    const link = createPhotographerLink({ id, name, picturePath });
    article.append(link);

    // 2) Bloc informations
    const infoFragment = createPhotographerInfo({ city, country, tagline, price });
    article.append(infoFragment);

    return article;
  }

  return { getUserCardDOM };
}
