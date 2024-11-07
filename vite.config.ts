import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://campusconnect-u3ax.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});