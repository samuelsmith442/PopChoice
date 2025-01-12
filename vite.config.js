import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174
  },
  define: {
    // This makes process.env work in the browser
    'process.env': {}
  }
});