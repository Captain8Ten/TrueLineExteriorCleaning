import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Run `npm run email:dev` in another terminal (email-worker, default port 8787).
      '/api/contact': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        rewrite: () => '/',
      },
    },
  },
})

