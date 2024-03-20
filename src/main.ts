import { createApp } from 'vue';
import 'normalcss';
import './assets/index.scss';
import App from './App';
import router from './router';
import 'tdesign-vue-next/es/style/index.css';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { createPinia } from 'pinia';
// import { createRouter, createWebHistory } from 'vue-router';
// wujie-vue3封装组件
import { initWujie } from './utils/micro';
// jd micro
import microApp from '@micro-zoe/micro-app';
// jd micro
microApp.start();

dayjs.locale('zh-cn');

const pinpa = createPinia();

const app = createApp(App);

// app.use(pinpa).use(router)
// app.mount('#app');

/// wujie
initWujie(app, router, pinpa);

console.log(window)

if (window.window.__POWERED_BY_WUJIE__) {
  console.log('wujie')
}

if (window.__MICRO_APP_BASE_APPLICATION__) {
  console.log('JD MicroApp 我是主应用')
}

