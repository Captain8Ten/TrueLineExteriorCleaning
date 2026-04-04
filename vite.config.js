import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Run `npm run pages:dev` in another terminal (Wrangler serves dist + functions on 8788).
      '/api/contact': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true,
      },
    },
  },
})

