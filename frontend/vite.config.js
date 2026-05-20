import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.80.28.38',
        changeOrigin: true,
      },
      '/media': { // YENİ EKLENDİ: Fotoğrafların sunucudan çekilebilmesi için
        target: 'http://10.80.28.38',
        changeOrigin: true,
      }
    }
  }
})