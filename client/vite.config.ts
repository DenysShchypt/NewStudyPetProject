import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-history',
      configureServer(server) {
        server.middlewares.use(
          history({
            rewrites: [{ from: /\/(.*)/, to: '/' }],
          }) as any // Потрібно використати any для обходу типів
        );
      },
    },
  ],
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      external: ['@emotion/react', '@emotion/styled'],
    },
  },
});