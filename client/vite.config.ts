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
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  
});