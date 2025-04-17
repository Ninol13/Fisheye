FishEye - Prototype Dynamique

FishEye est un prototype de site web permettant à des photographes indépendants de présenter leurs travaux. Ce projet a été réalisé dans le cadre d'un cours OpenClassrooms, en utilisant HTML, CSS et JavaScript (avec l'API Fetch) pour générer dynamiquement les contenus à partir d'un fichier JSON.

🎯 Objectifs

Récupérer des données photographes depuis un fichier JSON (data/photographers.json) via fetch().

Générer automatiquement les fiches photographes sur la page d'accueil.

Afficher le détail d'un photographe sélectionné, avec son header et sa galerie média.

Assurer l'accessibilité et la navigation clavier (modale de contact et focus management).

Mettre en œuvre un pattern Factory Method pour gérer la création des médias (photos vs vidéos).

📂 Structure du projet

/Fisheye
├─ assets/                  # Images, icônes, portraits
│   └─ photographers/       # Portraits des photographes
├─ css/
│   ├─ style.css            # Styles globaux et grille
│   └─ photographer.css      # Styles spécifiques à la page photographe
├─ data/
│   └─ photographers.json   # Données JSON des photographes
├─ scripts/
│   ├─ pages/
│   │   ├─ index.js         # Récupération des données et affichage liste
│   │   └─ photographer.js   # Récupération par ID et affichage détail
│   ├─ templates/
│   │   └─ photographer.js   # Factory pour créer les cartes et le profil
│   └─ utils/
│       └─ contactForm.js    # Gestion de la modale de contact
├─ index.html               # Page d'accueil
├─ photographer.html        # Page détail photographe
└─ README.md                # Documentation du projet

🚀 Installation et lancement

Cloner le dépôt

git clone git@github.com:Ninol13/Fisheye.git
cd Fisheye

Démarrer un serveur local (pour autoriser l'API Fetch sur le JSON) :

Via Node.js (http-server) :

npm install -g http-server
http-server -p 8000

Ouvrir l'application

Naviguer vers http://localhost:8000

🛠️ Technologies

HTML5 pour la structure des pages

CSS3 (Grid, Flexbox) pour la mise en forme et la grille responsive

JavaScript (ES6+)

fetch() pour récupérer le JSON

factory functions pour générer les composants

modules (organisation en dossiers pages, templates, utils)

Pattern Factory Method pour distinguer la création de composants médias

📋 Fonctionnalités existantes

Page d'accueil :

Récupération et affichage dynamique de toutes les fiches photographes.

Grille responsive qui s'adapte à la taille de l'écran.

Page détail photographe :

Récupération des données d'un photographe selon l'id dans l'URL.

Affichage de l'en-tête photographe et galerie média.

Modale de contact accessible au clavier.

Accessibilité :

Navigation au clavier sur la modale.

Attributs alt et aria-label pour les images et liens.

🔜 Prochaines étapes

Intégrer la gestion des médias (photos/vidéos) via le pattern Factory Method.

Ajouter des filtres/permutations sur la liste des photographes.

Améliorer le design et l’UI selon les retours du Designer.

Ajouter des tests unitaires JavaScript pour les fonctions de récupération et de templating.

📝 Licence

Ce projet est fourni à des fins pédagogiques. Voir le fichier LICENSE pour plus de détails.

Développé par Nino Litim dans le cadre du projet OpenClassrooms P06.

