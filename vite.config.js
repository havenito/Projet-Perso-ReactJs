import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cdn': {
        target: 'https://ddragon.leagueoflegends.com', // L'URL cible
        changeOrigin: true,  // Permet de changer l'origine des requêtes
        rewrite: (path) => path.replace(/^\/cdn/, '') // Réécriture de l'URL
      },
    },
  },
});