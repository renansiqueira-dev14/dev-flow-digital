import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Lovable deploys at the domain root. GitHub Pages overrides this through
  // SITE_BASE_PATH in its workflow because the project lives in a subdirectory.
  base: command === 'build' ? (process.env.SITE_BASE_PATH || '/') : '/',
}))
