export const projects = [
  {
    id: "cordees",
    title: "Les Cordées du Leadership",
    subtitle:
      "Site vitrine client réel — de la conception au déploiement sécurisé",
    tags: ["client réel", "SEO"],
    stack: ["React", "Vite", "SCSS", "Netlify", "OVH", "Node"],
    highlights: [
      "Identité visuelle définie sur mesure (photos, palette or/charbon, Cormorant + Barlow)",
      "Déploiement Netlify + DNS OVH, HTTPS",
      "Durcissement sécurité (headers, Semgrep, OWASP ZAP, Gitleaks)",
      "Conformité RGPD/CNIL, formulaire serverless self-hosted",
    ],
    image: "/images/cordees.webp",
    links: { demo: "https://lescordees.pro", code: "" },
  },
  {
    id: "argentbank",
    title: "ArgentBank",
    subtitle: "Application bancaire full-stack React / Redux",
    tags: ["full-stack"],
    stack: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Node",
      "Express",
      "MongoDB",
      "JWT",
      "Swagger",
    ],
    highlights: [
      "Authentification JWT + routes protégées (PrivateRoute)",
      "Store Redux centralisé (slice auth)",
      "Phase 2 : API transactions documentée en Swagger/OpenAPI",
    ],
    image: "/images/argentbank.webp",
    links: {
      demo: "https://argentbank-frontend.netlify.app/",
      code: "https://github.com/peromarc83-pixel/ArgentBank-Frontend",
    },
  },
  {
    id: "nina-carducci",
    title: "Nina Carducci",
    subtitle: "Optimisation SEO, accessibilité & performance",
    tags: ["SEO"],
    stack: ["HTML", "CSS", "JavaScript", "Schema.org", "WebP", "Lighthouse"],
    metrics: { performance: 99, accessibilite: "67 → 100", seo: "73 → 100" },
    highlights: [
      "Images ~29 Mo → WebP + redimensionnement",
      "Données structurées JSON-LD (LocalBusiness), Open Graph",
      "Débogage de la galerie JS",
    ],
    image: "/images/nina-carducci.webp",
    links: {
      demo: "https://ninacarducci-portfolio.netlify.app/",
      code: "https://github.com/peromarc83-pixel/ninacarducci.github.io",
    },
  },
];
