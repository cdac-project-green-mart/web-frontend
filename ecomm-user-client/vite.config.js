// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy ALL /api/v1 calls to backend (port 3000)
      '/api/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // No rewrite needed — keep the /api/v1 prefix
      },
      // Optional: if you have other /api calls without /v1
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // backend-inventory-service (port 4001)
      '/inventory': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})