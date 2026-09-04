import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'

import App from '@/App.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import Hero from '@/sections/Hero.jsx'
import About from '@/sections/About.jsx'
import Skills from '@/sections/Skills.jsx'
import Projects from '@/sections/Projects.jsx'
import Journey from '@/sections/Journey.jsx'
import Contact from '@/sections/Contact.jsx'

// Règles désactivées : elles supposent un vrai moteur de rendu (layout, styles
// calculés) que jsdom ne fournit pas, donc axe ne peut pas les évaluer ici.
const axeOptions = {
  rules: {
    'color-contrast': { enabled: false },
  },
}

describe('accessibilité', () => {
  it("la page complète n'a aucune violation axe", async () => {
    const { container } = render(<App />)
    const results = await axe(container, axeOptions)
    expect(results).toHaveNoViolations()
  })

  const sections = [
    ['Navbar', Navbar],
    ['Hero', Hero],
    ['About', About],
    ['Skills', Skills],
    ['Projects', Projects],
    ['Journey', Journey],
    ['Contact', Contact],
    ['Footer', Footer],
  ]

  it.each(sections)('la section %s n\'a aucune violation axe', async (_name, Component) => {
    const { container } = render(<Component />)
    const results = await axe(container, axeOptions)
    expect(results).toHaveNoViolations()
  })
})
