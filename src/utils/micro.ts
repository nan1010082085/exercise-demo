/**
 * @description: 注册微前端
 */

import type { App } from 'vue';
import WujieVue from 'wujie-vue3';
import microApp from '@micro-zoe/micro-app';

export const initWujie = (app: App<Element>) => {
  const mount = () => {
    app.use(WujieVue);
    app.mount('#app');
  };

  if (window.__POWERED_BY_WUJIE__) {
    window.__WUJIE_MOUNT = () => {
      mount();
    };
    window.__WUJIE_UNMOUNT = () => {
      app.unmount();
    };
    /*
      由于vite是异步加载，而无界可能采用fiber执行机制
      所以mount的调用时机无法确认，框架调用时可能vite
      还没有加载回来，这里采用主动调用防止用没有mount
      无界mount函数内置标记，不用担心重复mount
    */
    window.__WUJIE.mount();
  } else {
    mount();
  }
};

export const startMicroApp = () => {
  microApp.start({ iframe: true });
}
