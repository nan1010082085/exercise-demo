/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import JSX from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import imageminPlugin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import cssnano from 'cssnano';
// import visualizer from 'rollup-plugin-visualizer';

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
    changeOrigin: true
    // rewrite: (path: string) => {
    //   return path.replace(/^\/public/, '');
    // }
  },
  '/cmaps': {
    target: 'http://localhost:6606/public',
    changeOrigin: true
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
      proxy,
      hmr: {
        overlay: false,
        clientPort: 6606
      }
    },
    css: {
      devSourcemap: false, // 开发环境关闭 sourcemap
      postcss: {
        plugins: [
          cssnano({
            preset: 'cssnano-preset-advanced'
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          // 抑制弃用警告
          quietDeps: true,
          logger: {
            warn: (message: string) => {
              // 过滤掉 legacy-js-api 警告
              if (!message.includes('legacy-js-api')) {
                console.warn(message);
              }
            }
          }
        }
      }
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
        '@test-v': fileURLToPath(new URL('./src/test-v', import.meta.url))
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => isCustomElementArrays.includes(tag)
          }
        },
        include: [/\.vue$/],
        script: {
          defineModel: true,
          propsDestructure: true
        }
        // reactivityTransform: false
      }),
      JSX({
        isCustomElement: (tag) => isCustomElementArrays.includes(tag)
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [TDesignResolver({ library: 'vue-next' }), ElementPlusResolver()]
      }),
      Components({ resolvers: [TDesignResolver({ library: 'vue-next' }), ElementPlusResolver()] }),
      WindiCSS(),
      // react({
      //   // 仅处理 .jsx 和 .tsx 文件
      //   include: ['**/*.jsx', '**/*.tsx']
      // })
      // 图片优化
      imageminPlugin({
        gifsicle: { interlaced: false },
        mozjpeg: { quality: 80 },
        pngquant: { quality: [0.8, 0.9] },
        svgo: {
          plugins: [{ removeViewBox: false }]
        }
      }),
      // gzip 压缩
      compression({
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 生成后缀
        threshold: 10240, // 仅压缩 >10KB 的文件
        deleteOriginFile: false // 保留原始文件
      })
      // visualizer({ open : true })
    ],
    define: {
      'import.meta.vitest': process.env.NODE_ENV === 'development' ? true : false
    },
    test: {
      includeSource: ['src/**/*.test.{js,ts,tsx}']
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'lodash-es'],
      exclude: ['pdfjs-dist']
    },
    build: {
      // 关闭压缩报告
      reportCompressedSize: false,
      terserOptions: {
        compress: {
          unused: true,
          dead_code: true
        }
      },
      rollupOptions: {
        output: {
          entryFileNames: `[name]-[hash].js`,
          chunkFileNames: `[name]-[hash].js`,
          assetFileNames: `[name]-[hash].[ext]`,
          manualChunks: {
            'vue-lib': ['vue', 'vue-router', 'pinia'],
            charts: ['echarts'],
            lodash: ['lodash-es'],
            pdfjs: ['pdfjs-dist']
          }
        }
      }
    }
  };
});
