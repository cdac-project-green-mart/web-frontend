// vite.config.js
// All /api traffic goes through API Gateway per deployment-repo/docs/API_REFERENCE.md
// backend-api-gateway uses port 8888; deployment-repo gateway uses 8080
// Override with VITE_API_GATEWAY_URL env (e.g. http://localhost:8080)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const gatewayUrl = process.env.VITE_API_GATEWAY_URL || 'http://localhost:8888'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: gatewayUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
