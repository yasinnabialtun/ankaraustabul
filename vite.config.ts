import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { fileURLToPath, URL } from 'node:url';

// PWA Configuration
const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'robots.txt', 'images/**/*', 'animations/**/*'],
  manifest: {
    name: 'Ankara Usta Bul',
    short_name: 'AnkaraUstaBul',
    description: 'Ankara\'da güvenilir usta arama platformu',
    theme_color: '#0284c7',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }
    ],
  },
  workbox: {
    // Cache strategies
    runtimeCaching: [
      {
        // Cache images with network-first strategy
        urlPattern: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          },
        },
      },
      {
        // Cache animations with cache-first strategy
        urlPattern: /animations\//,
        handler: 'CacheFirst',
        options: {
          cacheName: 'animations-cache',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
          },
        },
      },
      {
        // Cache API requests with stale-while-revalidate strategy
        urlPattern: /^https:\/\/ankaraustabul\.com\/api/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 3 * 60 * 60, // 3 hours
          },
          cacheableResponse: {
            statuses: [0, 200]
          },
        },
      },
      {
        // Cache font files with cache-first strategy
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        // Cache font files with cache-first strategy
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      }
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaConfig),
  ],
  server: {
    port: 5173, // Değiştirildi: 3000 -> 5173 (Vite'ın varsayılan portu)
    host: true, // Network erişimi için
    open: true, // Tarayıcıyı otomatik aç
    cors: true, // CORS desteği
    hmr: {
      overlay: true, // Hata overlay'i
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Configure chunk splitting for better caching
    rollupOptions: {
      output: {
        // Use hashed file names for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Chunk configuration to better separate libraries
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          ui: ['@headlessui/react', '@tabler/icons-react', 'lucide-react'],
          lottie: ['@lottiefiles/react-lottie-player'],
        },
      },
    },
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // Process PostCSS options
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        // Other plugins can be added here
      ],
    },
  },
  // Enable esbuild optimization for faster builds
  esbuild: {
    legalComments: 'none',
    target: 'es2020',
    drop: ['console', 'debugger'],
  },
});