import { photographerTemplate } from '../templates/photographer.js';

export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des données : ${response.statusText}`);
        }

        // Extraction des données JSON
        const data = await response.json();

        // Affichage dans la console pour vérification
        console.log("Données récupérées :", data);

        // Retourner les données
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

document.addEventListener('DOMContentLoaded', init);