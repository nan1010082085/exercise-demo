/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

const target = 'http://localhost:6606/';

const proxy = {
  '/public': {
    target,
    changeOrigin: true,
    rewrite: (path: string) => {
      return path.replace(/^\/public/, '')
    }
  },
  '/workers': {
    target,
    changeOrigin: true,
    rewrite: (path: string) => {
      return path.replace(/^\/workers/, '')
    }
  }
};

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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@public': fileURLToPath(new URL('./src/public', import.meta.url)),
        '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@workers': fileURLToPath(new URL('./src/workers', import.meta.url))
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
