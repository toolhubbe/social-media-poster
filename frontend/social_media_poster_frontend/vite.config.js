/**
 * Vite Configuration
 * File Location: vite.config.js
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/vite.config.js
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
