import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiSass,
  SiRedux,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiSwagger,
  SiGit,
  SiGithub,
  SiNetlify,
  SiOvh,
  SiFigma,
  SiLighthouse,
  SiEslint,
  SiPrettier,
} from 'react-icons/si'
import {
  Braces,
  Webhook,
  Accessibility,
  Search,
  ShieldCheck,
  Lock,
  Gauge,
  Code2,
  Server,
  Wrench,
} from 'lucide-react'

/**
 * Section « Compétences » présentée sous forme de 4 sphères (une par univers)
 * alignées sur une même ligne et reliées par une ligne lumineuse. `icon` est
 * le glyphe affiché sur la sphère elle-même.
 *
 * Chaque compétence, dans le panneau de détail, porte son vrai logo (Simple
 * Icons) dans sa couleur de marque, calibrée pour rester lisible sur fond
 * sombre ; les notions sans logo (BEM, API REST, accessibilité…) utilisent
 * une icône Lucide dans la couleur de leur univers.
 */
export const UNIVERSES = [
  {
    id: 'front',
    name: 'Front-end',
    color: '#7c83f0',
    icon: Code2,
    description:
      "Construire l'interface : structure, style, gestion d'état et outil de build.",
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript (ES6+)', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#3C9CD7' },
      { name: 'SCSS', Icon: SiSass, color: '#CF6E9C' },
      { name: 'BEM', Icon: Braces, color: '#7c83f0' },
      { name: 'Redux Toolkit', Icon: SiRedux, color: '#A984E0' },
      { name: 'Vite', Icon: SiVite, color: '#9A8CFF' },
    ],
  },
  {
    id: 'back',
    name: 'Back-end',
    color: '#3fc9d4',
    icon: Server,
    description:
      'Servir les données : API REST, base de données, authentification et documentation.',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#7DC960' },
      { name: 'Express', Icon: SiExpress, color: '#E7E8F2' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#4CB050' },
      { name: 'API REST', Icon: Webhook, color: '#3fc9d4' },
      { name: 'JWT', Icon: SiJsonwebtokens, color: '#E7E8F2' },
      { name: 'Swagger / OpenAPI', Icon: SiSwagger, color: '#85EA2D' },
    ],
  },
  {
    id: 'tools',
    name: 'Outils',
    color: '#a98bff',
    icon: Wrench,
    description:
      'Versionner, déployer, mesurer et cadrer le travail au quotidien.',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05033' },
      { name: 'GitHub', Icon: SiGithub, color: '#E7E8F2' },
      { name: 'Netlify', Icon: SiNetlify, color: '#32E0D6' },
      { name: 'OVH', Icon: SiOvh, color: '#5B6EF0' },
      { name: 'Figma', Icon: SiFigma, color: '#F5764C' },
      { name: 'Lighthouse', Icon: SiLighthouse, color: '#F5A623' },
      { name: 'ESLint', Icon: SiEslint, color: '#8A7BEA' },
      { name: 'Prettier', Icon: SiPrettier, color: '#F0C860' },
    ],
  },
  {
    id: 'spec',
    name: 'Spécialités',
    color: '#3fca86',
    icon: ShieldCheck,
    description:
      'Ce que je surveille sur chaque projet, du premier commit à la mise en ligne.',
    skills: [
      { name: 'Accessibilité (WCAG AA)', Icon: Accessibility, color: '#3fca86' },
      { name: 'SEO technique', Icon: Search, color: '#3fca86' },
      { name: 'Sécurité web', Icon: ShieldCheck, color: '#3fca86' },
      { name: 'RGPD / CNIL', Icon: Lock, color: '#3fca86' },
      { name: 'Performance', Icon: Gauge, color: '#3fca86' },
    ],
  },
]
