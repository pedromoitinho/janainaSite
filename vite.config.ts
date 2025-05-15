import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      'process.env': env, // Ensure process.env is defined for compatibility
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
      outDir: 'dist',
    },
    base: './', // Use relative paths
  };
});
