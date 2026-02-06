// vite.config.js
// All /api traffic goes through API Gateway (deployment-repo)
// deployment-repo gateway: http://localhost:8080
// Override with VITE_API_GATEWAY_URL env
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const gatewayUrl = process.env.VITE_API_GATEWAY_URL || 'http://localhost:8080'

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
