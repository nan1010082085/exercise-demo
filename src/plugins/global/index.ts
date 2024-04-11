import 'normalcss';
import '@assets/index.scss';
import 'tdesign-vue-next/es/style/index.css';
import 'element-plus/dist/index.css';
import type { App } from 'vue';
import { ElLoading } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// mock 
// import '@plugins/mock';


/**
 * 注册 Element-plus/icons
 * @param {App} app
 */
const installComponent = (app: App<Element>) => {
  // element-plus-icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};

/**
 * 全局注册
 * @param {App} app
 * @description directive 指令 component 组件
 */
export const initalGlobalRegister = (app: App<Element>) => {
  app.directive('loading', ElLoading.directive);

  installComponent(app);
};
