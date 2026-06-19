import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // Environment-specific base path
  base: mode === 'production' ? '/catalyst-codex/' : '/',

  // Environment variable configuration
  envDir: '.', // Look for .env files in the root directory
}));
