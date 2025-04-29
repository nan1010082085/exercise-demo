// windi 配置文件

import { defineConfig } from 'vite-plugin-windicss'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  satisfies: '',
  theme: {
    extend: {
      colors: {
        'primary': '#0ea5e9',
        'secondary': '#f97316',
      },
    },
  },
  plugins: [
    formsPlugin,
  ],
  preflight: false,
})
