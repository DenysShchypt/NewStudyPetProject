import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    open: '/register',
  },
  resolve: {
    alias: {
      '@emotion/styled': '@emotion/styled',
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      external: ['@emotion/react', '@emotion/styled'],
    },
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  
});