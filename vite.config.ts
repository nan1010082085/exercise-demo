/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    define: {},
    resolve: {
      alias: {
        '@': `${process.cwd()}/src`
      }
    },
    plugins: [vue(), JSX()],
    test: {}
  };
});
