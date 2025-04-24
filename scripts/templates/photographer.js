export function photographerTemplate(photographer) {

  const { name, id, city, country, tagline, price, portrait } = photographer;

  // Chemin relatif à index.html vers le dossier de portraits
  const picturePath = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    // Créer le lien vers la page détail
    const link = document.createElement('a');
    link.href = `photographer.html?id=${id}`;
    link.setAttribute('aria-label', name);

    // Créer et configurer l'image
    const img = document.createElement('img');
    img.src = picturePath;                 // chemin vers le dossier
    img.className = 'photographer-portrait';
    link.appendChild(img);

    // Créer et ajouter le nom
    const h2 = document.createElement('h2');
    h2.textContent = name;
    link.appendChild(h2);

    article.appendChild(link);

    // Ajouter ville, tagline, prix comme avant
    const location = document.createElement('p');
    location.className = 'photographer-location';
    location.textContent = `${city}, ${country}`;
    article.appendChild(location);

    const tag = document.createElement('p');
    tag.className = 'photographer-tagline';
    tag.textContent = tagline;
    article.appendChild(tag);

    const cost = document.createElement('p');
    cost.className = 'photographer-price';
    cost.textContent = `${price}€/jour`;
    article.appendChild(cost);

    return article;
  }

  return { getUserCardDOM };
}