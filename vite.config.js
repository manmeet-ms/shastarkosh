import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import { tanstackRouter } from '@tanstack/router-plugin/vite'

import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// openssl req -x509 -newkey rsa:2048 -keyout certs/localhost-key.pem -out certs/localhost.pem -days 365 -nodes -subj "/CN=localhost"

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    chunkSizeWarningLimit:5000,
    rollupOptions:{
      output:{
        manualChunks:{lodash: ['lodash']},
      }
    }
  },
  server: {
    allowedHosts: ["771707c2a291.ngrok-free.app"],
    https:true,
  },
  plugins: [
     tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    mkcert(),
    // VitePWA({
    //   strategies: "injectManifest",
    //   srcDir: "public", // changed to resolve our dir location issue while build , no need to explicitly define build{}
    //   filename: "sw.js",
    //   registerType: "prompt",
    //   injectRegister: false,

    //   manifest: {
    //     name: "Shastarkosh",
    //     short_name: "Shastarkosh",
    //     description: "Shastarkosh",
    //     theme_color: "#ffffff",

    //     icons: [
    //       {
    //         src: "pwa-64x64.png",
    //         sizes: "64x64",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "maskable-icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "maskable",
    //       },
    //     ],
    //   },

    //   injectManifest: {
    //     globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
    //   },

    //   devOptions: {
    //     enabled: false,
    //     navigateFallback: "index.html",
    //     suppressWarnings: true,
    //     type: "module",
    //   },
    // }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
