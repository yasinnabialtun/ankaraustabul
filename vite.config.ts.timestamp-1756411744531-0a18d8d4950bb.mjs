// vite.config.ts
import { defineConfig } from "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/node_modules/vite-plugin-pwa/dist/index.js";
import autoprefixer from "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/node_modules/tailwindcss/lib/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/benim/OneDrive/Desktop/ankaraustabul/vite.config.ts";
var pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "robots.txt", "images/**/*", "animations/**/*"],
  manifest: {
    name: "Ankara Usta Bul",
    short_name: "AnkaraUstaBul",
    description: "Ankara'da g\xFCvenilir usta arama platformu",
    theme_color: "#0284c7",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  },
  workbox: {
    // Cache strategies
    runtimeCaching: [
      {
        // Cache images with network-first strategy
        urlPattern: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60
            // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        // Cache animations with cache-first strategy
        urlPattern: /animations\//,
        handler: "CacheFirst",
        options: {
          cacheName: "animations-cache",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 24 * 60 * 60
            // 60 days
          }
        }
      },
      {
        // Cache API requests with stale-while-revalidate strategy
        urlPattern: /^https:\/\/ankaraustabul\.com\/api/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 3 * 60 * 60
            // 3 hours
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        // Cache font files with cache-first strategy
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60
            // 30 days
          }
        }
      },
      {
        // Cache font files with cache-first strategy
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60
            // 30 days
          }
        }
      }
    ]
  }
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA(pwaConfig)
  ],
  server: {
    port: 3e3,
    open: true
  },
  preview: {
    port: 4173
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Configure chunk splitting for better caching
    rollupOptions: {
      output: {
        // Use hashed file names for better caching
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
        // Chunk configuration to better separate libraries
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          framer: ["framer-motion"],
          ui: ["@headlessui/react", "@tabler/icons-react", "lucide-react"],
          lottie: ["@lottiefiles/react-lottie-player"]
        }
      }
    },
    // Minify options
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    // Process PostCSS options
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
        // Other plugins can be added here
      ]
    }
  },
  // Enable esbuild optimization for faster builds
  esbuild: {
    legalComments: "none",
    target: "es2020",
    drop: ["console", "debugger"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxiZW5pbVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGFua2FyYXVzdGFidWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGJlbmltXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcYW5rYXJhdXN0YWJ1bFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYmVuaW0vT25lRHJpdmUvRGVza3RvcC9hbmthcmF1c3RhYnVsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IFZpdGVQV0EsIFZpdGVQV0FPcHRpb25zIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcclxuXHJcbi8vIFBXQSBDb25maWd1cmF0aW9uXHJcbmNvbnN0IHB3YUNvbmZpZzogUGFydGlhbDxWaXRlUFdBT3B0aW9ucz4gPSB7XHJcbiAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdyb2JvdHMudHh0JywgJ2ltYWdlcy8qKi8qJywgJ2FuaW1hdGlvbnMvKiovKiddLFxyXG4gIG1hbmlmZXN0OiB7XHJcbiAgICBuYW1lOiAnQW5rYXJhIFVzdGEgQnVsJyxcclxuICAgIHNob3J0X25hbWU6ICdBbmthcmFVc3RhQnVsJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnQW5rYXJhXFwnZGEgZ1x1MDBGQ3ZlbmlsaXIgdXN0YSBhcmFtYSBwbGF0Zm9ybXUnLFxyXG4gICAgdGhlbWVfY29sb3I6ICcjMDI4NGM3JyxcclxuICAgIGJhY2tncm91bmRfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgIGljb25zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6ICcvcHdhLTE5MngxOTIucG5nJyxcclxuICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLFxyXG4gICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcclxuICAgICAgfVxyXG4gICAgXSxcclxuICB9LFxyXG4gIHdvcmtib3g6IHtcclxuICAgIC8vIENhY2hlIHN0cmF0ZWdpZXNcclxuICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBDYWNoZSBpbWFnZXMgd2l0aCBuZXR3b3JrLWZpcnN0IHN0cmF0ZWd5XHJcbiAgICAgICAgdXJsUGF0dGVybjogL1xcLihqcGd8anBlZ3xwbmd8Z2lmfHN2Z3x3ZWJwKSQvLFxyXG4gICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlcy1jYWNoZScsXHJcbiAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgIG1heEVudHJpZXM6IDEwMCxcclxuICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xyXG4gICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIC8vIENhY2hlIGFuaW1hdGlvbnMgd2l0aCBjYWNoZS1maXJzdCBzdHJhdGVneVxyXG4gICAgICAgIHVybFBhdHRlcm46IC9hbmltYXRpb25zXFwvLyxcclxuICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgY2FjaGVOYW1lOiAnYW5pbWF0aW9ucy1jYWNoZScsXHJcbiAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgIG1heEVudHJpZXM6IDMwLFxyXG4gICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDI0ICogNjAgKiA2MCwgLy8gNjAgZGF5c1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gQ2FjaGUgQVBJIHJlcXVlc3RzIHdpdGggc3RhbGUtd2hpbGUtcmV2YWxpZGF0ZSBzdHJhdGVneVxyXG4gICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvYW5rYXJhdXN0YWJ1bFxcLmNvbVxcL2FwaS8sXHJcbiAgICAgICAgaGFuZGxlcjogJ1N0YWxlV2hpbGVSZXZhbGlkYXRlJyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjYWNoZU5hbWU6ICdhcGktY2FjaGUnLFxyXG4gICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICBtYXhFbnRyaWVzOiAyMDAsXHJcbiAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDMgKiA2MCAqIDYwLCAvLyAzIGhvdXJzXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcclxuICAgICAgICAgICAgc3RhdHVzZXM6IFswLCAyMDBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBDYWNoZSBmb250IGZpbGVzIHdpdGggY2FjaGUtZmlyc3Qgc3RyYXRlZ3lcclxuICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbS8sXHJcbiAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNhY2hlTmFtZTogJ2dvb2dsZS1mb250cy1jYWNoZScsXHJcbiAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgIG1heEVudHJpZXM6IDIwLFxyXG4gICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gQ2FjaGUgZm9udCBmaWxlcyB3aXRoIGNhY2hlLWZpcnN0IHN0cmF0ZWd5XHJcbiAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdzdGF0aWNcXC5jb20vLFxyXG4gICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjYWNoZU5hbWU6ICdnc3RhdGljLWZvbnRzLWNhY2hlJyxcclxuICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgbWF4RW50cmllczogMjAsXHJcbiAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgfSxcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIFZpdGVQV0EocHdhQ29uZmlnKSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0OiA0MTczLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgIC8vIENvbmZpZ3VyZSBjaHVuayBzcGxpdHRpbmcgZm9yIGJldHRlciBjYWNoaW5nXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFVzZSBoYXNoZWQgZmlsZSBuYW1lcyBmb3IgYmV0dGVyIGNhY2hpbmdcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdLmpzJyxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdLltleHRdJyxcclxuICAgICAgICAvLyBDaHVuayBjb25maWd1cmF0aW9uIHRvIGJldHRlciBzZXBhcmF0ZSBsaWJyYXJpZXNcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIHJlYWN0OiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICBmcmFtZXI6IFsnZnJhbWVyLW1vdGlvbiddLFxyXG4gICAgICAgICAgdWk6IFsnQGhlYWRsZXNzdWkvcmVhY3QnLCAnQHRhYmxlci9pY29ucy1yZWFjdCcsICdsdWNpZGUtcmVhY3QnXSxcclxuICAgICAgICAgIGxvdHRpZTogWydAbG90dGllZmlsZXMvcmVhY3QtbG90dGllLXBsYXllciddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gTWluaWZ5IG9wdGlvbnNcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICAvLyBQcm9jZXNzIFBvc3RDU1Mgb3B0aW9uc1xyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgICBhdXRvcHJlZml4ZXIoKSxcclxuICAgICAgICAvLyBPdGhlciBwbHVnaW5zIGNhbiBiZSBhZGRlZCBoZXJlXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gRW5hYmxlIGVzYnVpbGQgb3B0aW1pemF0aW9uIGZvciBmYXN0ZXIgYnVpbGRzXHJcbiAgZXNidWlsZDoge1xyXG4gICAgbGVnYWxDb21tZW50czogJ25vbmUnLFxyXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcclxuICAgIGRyb3A6IFsnY29uc29sZScsICdkZWJ1Z2dlciddLFxyXG4gIH0sXHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxvQkFBb0I7QUFDbFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBK0I7QUFFeEMsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxlQUFlLFdBQVc7QUFOMEssSUFBTSwyQ0FBMkM7QUFTOVAsSUFBTSxZQUFxQztBQUFBLEVBQ3pDLGNBQWM7QUFBQSxFQUNkLGVBQWUsQ0FBQyxlQUFlLGNBQWMsZUFBZSxpQkFBaUI7QUFBQSxFQUM3RSxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsZ0JBQWdCO0FBQUEsTUFDZDtBQUFBO0FBQUEsUUFFRSxZQUFZO0FBQUEsUUFDWixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsWUFDVixZQUFZO0FBQUEsWUFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxVQUNoQztBQUFBLFVBQ0EsbUJBQW1CO0FBQUEsWUFDakIsVUFBVSxDQUFDLEdBQUcsR0FBRztB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
