# Portfolio — Marc Pero

Portfolio personnel : présentation, projets, parcours et formulaire de contact.
Développeur front-end React en formation full-stack.

🔗 **En ligne :** [marc-dev.fr](https://marc-dev.fr)

## Stack

| Domaine        | Outils                                                        |
| -------------- | ------------------------------------------------------------ |
| Front-end      | React 19, Vite 8                                              |
| Styles         | CSS natif (fichiers co-localisés + `src/styles`)             |
| Icônes         | lucide-react, react-icons                                    |
| Contact        | Fonction serverless Netlify + Nodemailer (SMTP OVH)          |
| Qualité        | Oxlint, Vitest + Testing Library, vitest-axe (accessibilité) |
| Hébergement    | Netlify (build + CDN), DNS OVH, HTTPS + en-têtes de sécurité |

## Prérequis

- Node.js >= 20 (développé sous Node 24)
- npm

## Démarrage

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script               | Rôle                                                        |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Serveur de développement (HMR)                             |
| `npm run build`      | Build de production → `dist/`                              |
| `npm run preview`    | Sert le build de production en local                       |
| `npm run lint`       | Analyse statique (Oxlint)                                  |
| `npm test`           | Tests Vitest (une passe, pour la CI)                       |
| `npm run test:watch` | Tests en mode watch                                        |
| `npm run images`     | Optimise les images de `public/images`                     |
| `npm run shots`      | Génère les captures d'écran des projets                    |

## Structure

```
src/
├── components/     Composants réutilisables (Navbar, Button, Modal, …)
├── sections/       Sections de la page (Hero, About, Skills, Projects, Journey, Contact)
├── data/           Contenu (liste des projets, parcours)
├── styles/         Variables et styles globaux
├── test/           Setup Vitest + tests
├── App.jsx
└── main.jsx

netlify/functions/  Fonction serverless du formulaire de contact
scripts/            Scripts Node (optimisation d'images, captures, image OG)
public/             Assets statiques servis tels quels
```

## Tests

Vitest + Testing Library, avec un test d'accessibilité (`vitest-axe`) qui monte
chaque section et la page complète et vérifie l'absence de violation.

```bash
npm test
```

> La règle `color-contrast` d'axe est désactivée : jsdom ne calcule pas les
> styles. Le contraste se vérifie côté navigateur (axe DevTools, Lighthouse).

## Variables d'environnement

La fonction de contact a besoin de variables SMTP, à définir dans Netlify
(*Site settings → Environment variables*) — jamais commitées.
Voir [`.env.example`](.env.example) pour la liste.

## Déploiement

Push sur `main` → build et déploiement automatiques par Netlify
(configuration dans [`netlify.toml`](netlify.toml) : commande de build, dossier
publié, fonctions, en-têtes de sécurité et CSP).

## Licence

Projet personnel. Le code est consultable à titre d'exemple ; le contenu
(textes, images, identité visuelle) reste la propriété de Marc Pero et ne peut
être réutilisé sans autorisation.
