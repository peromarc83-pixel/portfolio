import '@testing-library/jest-dom/vitest'
import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as axeMatchers from 'vitest-axe/matchers'

// vitest-axe@0.1.0 publie un `extend-expect` vide → on enregistre le matcher à la main
expect.extend(axeMatchers)

afterEach(() => {
  cleanup()
})

// jsdom n'implémente pas matchMedia (utilisé par SkillsUniverse)
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom n'implémente pas IntersectionObserver (utilisé par Navbar)
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
}

// scrollTo n'est pas implémenté par jsdom
window.scrollTo = vi.fn()
