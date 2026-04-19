import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [tailwindcss(), react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('framer-motion')) return 'vendor-framer-motion';
                if (id.includes('firebase')) return 'vendor-firebase';
                if (id.includes('@google/genai')) return 'vendor-genai';
                if (id.includes('react-markdown') || id.includes('remark')) return 'vendor-markdown';
                if (id.includes('lucide-react')) return 'vendor-lucide';
                return 'vendor-core';
              }
            }
          }
        }
      }
    };
});
