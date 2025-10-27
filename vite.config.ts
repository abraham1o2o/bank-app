import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // For GitHub Pages deployment we will output to `docs/`.
    // When publishing to the `bank-app` repo set base to '/bank-app/'.
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/bank-app/',
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/accounts': 'http://localhost:3000'
    }
  }
})
