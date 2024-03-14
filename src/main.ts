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

dayjs.locale('zh-cn');

const pinpa = createPinia();

const app = createApp(App);

// app.use(pinpa).use(router)
// app.mount('#app');

/// wujie
initWujie(app, router, pinpa);

