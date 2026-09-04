import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
export const THEMES = { DEFAULT: 'default', CONSTELLATION: 'constellation' }

function readInitialTheme() {
  // main.jsx pose déjà l'attribut avant le premier rendu (pas de flash) : on le relit ici.
  return document.documentElement.dataset.theme === THEMES.CONSTELLATION
    ? THEMES.CONSTELLATION
    : THEMES.DEFAULT
}

/**
 * Thème visuel du site ("default" | "constellation"), persisté en localStorage
 * et posé en attribut sur <html> pour que toute la CSS (variables.css et les
 * quelques fonds codés en dur) se reskine automatiquement.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // stockage indisponible (navigation privée, quota...) : le thème reste actif pour la session
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme((current) => (current === THEMES.CONSTELLATION ? THEMES.DEFAULT : THEMES.CONSTELLATION))

  return { theme, toggleTheme }
}
