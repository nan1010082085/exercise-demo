/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

const proxy = {};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: '/',
    server: {
      port: 6606,
      proxy
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      JSX(),
      AutoImport({ resolvers: [TDesignResolver({ library: 'vue-next' })] }),
      Components({ resolvers: [TDesignResolver({ library: 'vue-next' })] })
    ],
    define: {
      'import.meta.vitest': false
    },
    test: {
      includeSource: ['src/**/*.(t|j)s']
    }
  };
});
