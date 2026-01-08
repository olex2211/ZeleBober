import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8000',
      },
      '/ws': {
        target: 'ws://backend:8000',
        ws: true,
      },
      '/media': {
        target: 'http://backend:8000',
      },
      '/admin': {
        target: 'http://backend:8000',
      },
    }
  }
})