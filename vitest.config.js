/// <reference types="vitest/config" />
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config.js'

// Config Vitest séparée : Vite 8 transpile le JSX via oxc, mais Vitest passe
// encore par esbuild — il faut donc lui indiquer le runtime JSX automatique ici,
// sans polluer le build de prod.
export default mergeConfig(
  viteConfig,
  defineConfig({
    esbuild: {
      jsx: 'automatic',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.{test,spec}.{js,jsx}'],
    },
  }),
)
