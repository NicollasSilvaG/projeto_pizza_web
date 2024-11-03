import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Certifique-se de que a porta está correta
    open: true, // Isso abrirá automaticamente o navegador ao iniciar
  },
});
