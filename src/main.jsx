import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/variables.css'
import '@/styles/global.css'
import App from '@/App.jsx'

// Pose le thème choisi avant le premier rendu, pour éviter un flash du thème par
// défaut. Fait ici (plutôt qu'en script inline dans index.html) pour respecter la
// CSP du site (script-src 'self', pas d'inline).
try {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'constellation') {
    document.documentElement.dataset.theme = 'constellation'
  }
} catch {
  // stockage indisponible : reste sur le thème par défaut
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
