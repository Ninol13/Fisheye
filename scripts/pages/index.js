async function getPhotographers() {
    try {
        // Remplacer le chemin par celui de votre fichier JSON
        const response = await fetch('data/photographers.json');

        // Vérifiez que la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des données : ${response.statusText}`);
        }

        // Extraction des données JSON
        const data = await response.json();

        // Affichage dans la console pour vérification
        console.log("Données récupérées :", data);

        // Retourner les données (en supposant qu'elles sont structurées sous une clé "photographers")
        return data;
    } catch (error) {
      console.error("Erreur dans getPhotographers :", error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();