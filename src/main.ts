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
import WujieVue from 'wujie-vue3';

dayjs.locale('zh-cn');

const pinpa = createPinia();

// const app = createApp(App);

// app.use(pinpa).use(router)

// app.mount('#app');

console.log(window.__POWERED_BY_WUJIE__);

if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App);
    instance.use(router).use(pinpa);
    instance.use(WujieVue);
    instance.mount('#app');
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount();
} else {
  const app = createApp(App);
  app.use(router).use(pinpa);
  app.use(WujieVue);
  app.mount('#app');
}
