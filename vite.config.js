import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'], // Add more assets you need to include
      manifest: {
        // Your manifest settings here
        name: 'T-Mobile AR návod',
        short_name: 'modemAR',
        theme_color: '#ffffff',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // Add more icons as needed
        ],
      },
    }),
  ],
});