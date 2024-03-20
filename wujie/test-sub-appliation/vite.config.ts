import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    port: 6700
  },
  plugins: [vue(), JSX()]
});
