import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Gunakan `export default` untuk mengekspor konfigurasi
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://hdcs.hinodms.co.id/restapitest/frontend/web/index.php', // Ganti dengan URL target API yang sesuai
        changeOrigin: true, // Mengubah origin header jika diperlukan
        rewrite: (path) => path.replace(/^\/api/, ''), // Opsi untuk mengubah path URL jika diperlukan
      },
    },
  },
});
