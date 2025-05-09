/**
 * Crée l’en-tête de la modale (titre + bouton de fermeture).
 * @param {string} photographerName
 * @param {Function} closeHandler
 */
function createModalHeader(photographerName, closeHandler) {
  const header = document.createElement('header');

  const title = document.createElement('h2');
  title.id = 'contact-title';
  title.innerHTML = `Contactez-moi<br><span class="photographer-name">${photographerName}</span>`;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.setAttribute('aria-label', 'Fermer le formulaire');
  closeBtn.addEventListener('click', closeHandler);

  const closeIcon = document.createElement('img');
  closeIcon.src = 'assets/icons/close.svg';
  closeIcon.alt = 'Fermer';
  closeBtn.append(closeIcon);

  header.append(title, closeBtn);
  return header;
}

/**
 * Crée un champ de formulaire (label + input/textarea).
 * @param {{ label: string, type: string, id: string, name: string }} field
 */
function createFormField({ label: text, type, id, name }) {
  const div = document.createElement('div');

  const lbl = document.createElement('label');
  lbl.setAttribute('for', id);
  lbl.textContent = text;

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 5;
  } else {
    input = document.createElement('input');
    input.type = type;
  }
  input.id = id;
  input.name = name;
  input.required = true;

  div.append(lbl, input);
  return div;
}

/**
 * Crée le formulaire complet avec ses champs et bouton submit.
 * @param {Array} fieldsConfig
 */
function createForm(fieldsConfig) {
  const form = document.createElement('form');
  form.id = 'contact-form';

  fieldsConfig.forEach(config => {
    const fieldEl = createFormField(config);
    form.append(fieldEl);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'contact_button';
  submitBtn.textContent = 'Envoyer';
  form.append(submitBtn);

  return form;
}

/**
 * Affiche la modale de contact, en générant son contenu via des factories.
 * @param {string} photographerName
 */
export function displayModal(photographerName) {
  const wrapper = document.getElementById('contact_modal');
  wrapper.setAttribute('aria-hidden', 'false');
  wrapper.style.display = 'block';

  // Vider pour reconstruire
  wrapper.innerHTML = '';

  // Créer le conteneur modal
  const modal = document.createElement('div');
  modal.className = 'modal';

  // 1. Header
  const header = createModalHeader(photographerName, closeModal);

  // 2. Formulaire
  const fields = [
    { label: 'Prénom',        type: 'text',    id: 'first-name', name: 'first-name' },
    { label: 'Nom',           type: 'text',    id: 'last-name',  name: 'last-name'  },
    { label: 'Email',         type: 'email',   id: 'email',      name: 'email'      },
    { label: 'Votre message', type: 'textarea', id: 'message',    name: 'message'   }
  ];
  const form = createForm(fields);

  // 3. Assemblage
  modal.append(header, form);
  wrapper.append(modal);

  // 4. Gestion du submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log({
      firstName: form['first-name'].value,
      lastName:  form['last-name'].value,
      email:     form.email.value,
      message:   form.message.value
    });
    closeModal();
  });

  // 5. Récupérer tous les éléments focusables dans la modal
  const focusables = wrapper.querySelectorAll(
    'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusables[0];
  const lastFocusable  = focusables[focusables.length - 1];

  // 6. Donner le focus au premier élément
  firstFocusable.focus();

  // 7. Empêcher le focus de sortir de la modal et gérer Échap
  function trapFocus(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) { // Maj+Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {          // Tab seul
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  }

  wrapper.addEventListener('keydown', trapFocus);

  // 8. Nettoyage lors de la fermeture
  function cleanup() {
    wrapper.removeEventListener('keydown', trapFocus);
  }
  wrapper.addEventListener('modalClosed', cleanup);
}

export function closeModal() {
  const wrapper = document.getElementById('contact_modal');
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.style.display = 'none';

  // Rétablir le focus sur le bouton Contact
  const contactBtn = document.querySelector('.photograph-header .contact_button');
  if (contactBtn) contactBtn.focus();

  // Déclencher l’événement de cleanup
  wrapper.dispatchEvent(new Event('modalClosed'));
}

// Expose pour les appels inline éventuels
window.displayModal = displayModal;
window.closeModal   = closeModal;
