/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import WindiCSS from 'vite-plugin-windicss'

// --- env ---
// console.log(process.env.NODE_ENV)

const isCustomElementArrays = ['micro-app'];

const target = 'http://localhost:6606/';

const proxy = {
  // '/sys': {
  //   target: 'http://192.168.200.46:8083/avatar',
  //   changeOrigin: true,
  // },
  '/assets': {
    target: 'http://localhost:6606/public',
    changeOrigin: true,
    // rewrite: (path: string) => {
    //   return path.replace(/^\/public/, '');
    // }
  },
  '/cmaps': {
    target: 'http://localhost:6606/public',
    changeOrigin: true,
    // rewrite: (path: string) => {
    //   return path.replace(/^\/public/, '');
    // }
  },
  '/workers': {
    target,
    changeOrigin: true,
    rewrite: (path: string) => {
      return path.replace(/^\/workers/, '');
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: '/',
    server: {
      cors: true,
      port: 6606,
      proxy
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@board-models': fileURLToPath(new URL('./src/models/board-models', import.meta.url)),
        '@flow-models': fileURLToPath(new URL('./src/models/flow-models', import.meta.url)),
        '@public': fileURLToPath(new URL('./public', import.meta.url)),
        '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
        '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@workers': fileURLToPath(new URL('./src/workers', import.meta.url)),
        '@test-v': fileURLToPath(new URL('./src/test-v', import.meta.url)),
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => isCustomElementArrays.includes(tag),
          }
        }
      }),
      JSX({
        isCustomElement: (tag) => isCustomElementArrays.includes(tag),
      }),
      AutoImport({ imports: ['vue', 'vue-router'], resolvers: [TDesignResolver({ library: 'vue-next' }), ElementPlusResolver()] }),
      Components({ resolvers: [TDesignResolver({ library: 'vue-next' }), ElementPlusResolver()] }),
      WindiCSS()
    ],
    define: {
      'import.meta.vitest': process.env.NODE_ENV=== 'development' ? true : false
    },
    test: {
      includeSource: ['src/**/*.test.{js,ts,tsx}']
    },
    optimizeDeps: {
      exclude: ['pdfjs-dist'],
    },
  };
});
