# 🏀 TSI Basket League

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**TSI Basket League** est une plateforme web moderne dédiée à l'élite du basketball africain. Suivez l'action en direct, découvrez les statistiques des joueurs et vivez la passion du basketball comme jamais auparavant.

![TSI Basket League Banner](public/hero.png)

## ✨ Fonctionnalités

### 🏠 Page d'accueil dynamique
- **Section Hero** avec visuel immersif et logo officiel
- **Résultats récents** : Affichage des 5 derniers matchs terminés
- **Matchs à venir** : Calendrier des 3 prochaines rencontres
- **Classement actuel** : Top 5 des équipes
- **Équipes en vedette** : Présentation des équipes phares
- **Call-to-Action** pour découvrir la ligue

### 🏆 Pages principales

#### Équipes (`/teams`)
- Liste complète des équipes avec logos et couleurs
- Cartes interactives avec effets hover
- Page détail par équipe avec effectif complet
- Statistiques des joueurs par équipe

#### Joueurs (`/players`)
- Catalogue de tous les joueurs de la ligue
- Filtrage par équipe
- Statistiques détaillées (PTS, REB, AST)
- Informations physiques (taille, poids, âge)

#### Matchs (`/matchs`)
- Organisation par statut : **En direct**, **À venir**, **Résultats**
- Badge LIVE animé pour les matchs en cours
- Scores en temps réel
- Informations sur les lieux et dates

#### Classement (`/standings`)
- Tableau complet du classement
- Statistiques : Victoires, Défaites, Points pour/contre
- Différentiel de points coloré
- Mise à jour automatique

### 🎨 Design & UX

#### Palette de couleurs
- **Doré intense** (`#FFB300`) : Accent principal, boutons, scores
- **Bleu marine profond** (`#003366`) : Accent secondaire, headers
- **Rouge vif** (`#E53935`) : Matchs en direct, alertes
- **Vert sportif** (`#2E7D32`) : Victoires, statistiques positives
- **Fond clair** (`#FFFFFF`) / **Fond sombre** (`#0F1419`)

#### Thème sombre 🌙
- Basculement fluide entre mode clair et sombre
- Sauvegarde de la préférence utilisateur
- Détection automatique de la préférence système
- Prévention du flash de contenu non stylé (FOUC)

#### Responsive Design
- Optimisé pour mobile, tablette et desktop
- Grilles adaptatives
- Navigation intuitive
- Animations et transitions fluides

## 🚀 Installation

### Prérequis
- **Node.js** 18.x ou supérieur
- **npm**, **yarn**, **pnpm** ou **bun**

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/Exutoire03/tsi-basket-league.git
cd tsi-basket-league
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Ouvrir dans le navigateur**

Accédez à [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
tsi-basket-league/
├── app/
│   ├── api/                    # API Routes
│   │   ├── matches/           # Endpoint des matchs
│   │   ├── players/           # Endpoint des joueurs
│   │   ├── standings/         # Endpoint du classement
│   │   └── teams/             # Endpoint des équipes
│   ├── matchs/                # Page des matchs
│   ├── players/               # Page des joueurs
│   ├── standings/             # Page du classement
│   ├── teams/                 # Pages des équipes
│   │   └── [id]/             # Page détail équipe
│   ├── globals.css           # Styles globaux + variables CSS
│   ├── layout.tsx            # Layout racine
│   └── page.tsx              # Page d'accueil
├── components/
│   ├── Footer.tsx            # Composant Footer
│   ├── Header.tsx            # Composant Header + ThemeToggle
│   ├── MatchCard.tsx         # Carte de match
│   ├── PlayerCard.tsx        # Carte de joueur
│   ├── StandingsTable.tsx    # Tableau de classement
│   └── TeamCard.tsx          # Carte d'équipe
├── data/
│   ├── matches.json          # Données des matchs
│   ├── players.json          # Données des joueurs
│   └── teams.json            # Données des équipes
├── public/
│   ├── hero.png              # Image hero
│   ├── logo.png              # Logo couleur
│   └── logo-blanc.png        # Logo blanc
└── package.json
```

## 🛠️ Technologies utilisées

### Frontend
- **[Next.js 16](https://nextjs.org/)** - Framework React avec App Router
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first

### Backend
- **Next.js API Routes** - Endpoints REST
- **JSON** - Base de données locale (fichiers statiques)

### Outils de développement
- **ESLint** - Linting du code
- **PostCSS** - Transformation CSS
- **Geist Font** - Police optimisée

## 📊 API Endpoints

### Matchs
```
GET /api/matches
Query params:
  - status: 'finished' | 'live' | 'scheduled'
  - teamId: number
```

### Équipes
```
GET /api/teams
Query params:
  - id: number (optionnel, pour une équipe spécifique)
```

### Joueurs
```
GET /api/players
Query params:
  - teamId: number (optionnel, filtrer par équipe)
```

### Classement
```
GET /api/standings
Retourne le classement calculé basé sur les matchs terminés
```

## 🎯 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Construire l'application pour la production
npm run start        # Démarrer le serveur de production

# Qualité du code
npm run lint         # Vérifier le code avec ESLint
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à [Vercel](https://vercel.com)
2. Configurez le projet (détection automatique Next.js)
3. Déployez en un clic

### Autres plateformes

L'application peut être déployée sur :
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Google Cloud Run**
- Tout hébergeur supportant Node.js

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développement initial* - [VotreGitHub](https://github.com/votre-username)

## 🙏 Remerciements

- Design inspiré par les meilleures plateformes sportives
- Icônes et visuels de basketball
- Communauté Next.js et React

---

<div align="center">
  <strong>🏀 TSI Basket League - L'élite du basketball africain 🏀</strong>
  <br>
  <sub>Fait avec ❤️ et Next.js</sub>
</div>
