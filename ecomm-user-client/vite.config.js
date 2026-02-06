// vite.config.js
// All /api traffic goes through API Gateway (deployment-repo)
// deployment-repo gateway: http://localhost:8080
// Override with VITE_API_GATEWAY_URL env
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  const gatewayUrl = env.VITE_API_GATEWAY_URL || 'http://localhost:8080'

  return {
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
  }
})
