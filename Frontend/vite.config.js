import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'server' section
  server: {
    proxy: {
      // String shorthand: forward all requests starting with /api to the backend
      '/api': 'http://localhost:5001',
    },
  },
})
