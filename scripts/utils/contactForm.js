export function displayModal(photographerName) {
    const wrapper = document.getElementById("contact_modal");
    wrapper.setAttribute("aria-hidden", "false");
    wrapper.style.display = "block";

    // Vider le wrapper avant de reconstruire
    wrapper.innerHTML = "";

    // Création du conteneur modal
    const modal = document.createElement("div");
    modal.className = "modal";

    // 1. Header de la modale
    const header = document.createElement("header");

    const title = document.createElement("h2");
    title.id = "contact-title";
    title.innerHTML = `Contactez-moi<br><span class=\"photographer-name\">${photographerName}</span>`;

    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.setAttribute("aria-label", "Fermer le formulaire");
    const closeIcon = document.createElement("img");
    closeIcon.src = "assets/icons/close.svg";
    closeIcon.alt = "Fermer";
    closeBtn.appendChild(closeIcon);
    closeBtn.addEventListener("click", closeModal);

    header.append(title, closeBtn);

    // 2. Formulaire
    const form = document.createElement("form");
    form.id = "contact-form";

    const fields = [
      { label: "Prénom",        type: "text",    id: "first-name", name: "first-name" },
      { label: "Nom",           type: "text",    id: "last-name",  name: "last-name"  },
      { label: "Email",         type: "email",   id: "email",      name: "email"      },
      { label: "Votre message", type: "textarea", id: "message",    name: "message"   }
    ];

    fields.forEach(({ label: text, type, id, name }) => {
      const div = document.createElement("div");
      const lbl = document.createElement("label");
      lbl.setAttribute("for", id);
      lbl.textContent = text;

      let input;
      if (type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 5;
      } else {
        input = document.createElement("input");
        input.type = type;
      }
      input.id = id;
      input.name = name;
      input.required = true;

      div.append(lbl, input);
      form.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "contact_button";
    submitBtn.textContent = "Envoyer";
    form.appendChild(submitBtn);

    // Assemblage final
    modal.append(header, form);
    wrapper.appendChild(modal);

    // Gestion du submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log({
        firstName: form["first-name"].value,
        lastName:  form["last-name"].value,
        email:     form.email.value,
        message:   form.message.value
      });
      closeModal();
    });
}

export function closeModal() {
    const wrapper = document.getElementById("contact_modal");
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.style.display = "none";
}

window.displayModal = displayModal;
window.closeModal  = closeModal;
