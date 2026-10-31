import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development, this forwards any request to /api/... straight to
// the Express server on port 5000, so the React app can just call
// fetch("/api/rooms") without worrying about the full URL or CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
