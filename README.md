# Portfolio — Rémi Pierron

Ce dépôt contient le code source de mon **portfolio personnel**, un site web statique présentant mon parcours, mes projets académiques et professionnels, ainsi que mes centres d'intérêt.

🔗 Le site est accessible en ligne via GitHub Pages.

---

## À propos du site

Le portfolio est composé de **5 pages principales** :

| Page | Fichier | Description |
|------|---------|-------------|
| Accueil | `index.html` | Présentation générale, frise chronologique de mon parcours, mes 3 projets phares et mes outils |
| Projets | `projects.html` | Hub central listant mes projets par catégorie (stages, alternance, projets universitaires par année) |
| À propos | `about.html` | Mes loisirs (Taekwondo, musique) et mon profil de personnalité |
| Mes études | `debrief.html` | Retour d'expérience sur mon parcours en BUT Science des Données |
| Contact | `contact.html` | Mes coordonnées (LinkedIn, email) |

---

## Structure du projet

```
portfolio/
│
├── index.html              # Page d'accueil
├── projects.html           # Page listant les projets
├── about.html              # Page "À propos de moi"
├── debrief.html            # Page "Mes études"
├── contact.html            # Page de contact
│
├── styles.css              # Feuille de style principale (design, animations, responsive)
│
├── script/
│   └── texte-anim.js       # Script d'animation au survol des sections
│
├── image/
│   ├── logos/              # Logos des technologies maîtrisées (Python, R, Docker, etc.)
│   └── ...                 # Photos personnelles, images de projets, images de fond
│
├── projets/
│   ├── details/            # Pages HTML de détail pour chaque projet (34 fichiers)
│   └── index/              # Pages de synthèse par stage ou année universitaire (5 fichiers)
│
└── telechargements/        # Fichiers téléchargeables (CV, rapports de stage, projets, etc.)
```

### Détail des répertoires

#### `image/`
Contient toutes les ressources visuelles du site :
- **`logos/`** : logos des outils et technologies (Python, R, SQL, VBA, Git, GitHub, Docker, TensorFlow, Excel, VS Code)
- Photos personnelles et de travail
- Images d'illustration pour les projets
- Image de fond (`mac_os_10.webp`)

#### `projets/`
Contient les pages HTML dédiées aux projets, organisées en deux sous-dossiers :
- **`details/`** : une page par projet, avec description détaillée, technologies utilisées et livrables (34 pages)
- **`index/`** : pages de synthèse regroupant les projets par contexte — stages, alternance ou année de BUT (5 pages)

#### `script/`
Contient le fichier JavaScript gérant les animations d'interaction (survol à la souris, focus clavier, événements tactiles) sur les sections du site.

#### `telechargements/`
Regroupe l'ensemble des fichiers mis à disposition en téléchargement :
- CV (`CV.pdf`)
- Rapports de stage et d'alternance
- Rendus de projets (notebooks Jupyter, scripts Python, archives ZIP, présentations PowerPoint)
- Documents académiques (SAE : droit, économie, statistiques, informatique)

---

## Technologies utilisées

- **HTML5 / CSS3** — Structure et mise en forme des pages
- **JavaScript** — Animations interactives
- **Google Fonts** — Police *Rajdhani*
- **Font Awesome** — Icônes (page contact)

---

## Compétences présentées

Python · R · SQL · VBA · Excel · Git · GitHub · Docker · TensorFlow · Qlik · Power BI · R Shiny · MongoDB · QGIS · PySpark · Dash · API REST · Machine Learning · Deep Learning · Dataviz
