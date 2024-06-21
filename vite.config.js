import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'targets3.mind','/modem_web_model/model.json','/modem_web_model/group1-shard1of6.bin','/modem_web_model/group1-shard2of6.bin','/modem_web_model/group1-shard3of6.bin','/modem_web_model/group1-shard4of6.bin','/modem_web_model/group1-shard5of6.bin','/modem_web_model/group1-shard6of6.bin','robots.txt'], // Add more assets you need to include
      manifest: {
        // Your manifest settings here
        name: 'T-Mobile AR návod',
        short_name: 'modemAR',
        theme_color: '#ffffff',
        icons: [
          {
            src: '192.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '512.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
          // Add more icons as needed
        ],
      },
    }),
  ],
});