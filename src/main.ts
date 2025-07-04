import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { initalGlobalRegister } from '@plugins/global';
import App from './App';
// micro
import { startMicroApp } from './utils/micro';

import 'dayjs/locale/zh-cn';
import { dayjs } from 'element-plus';
import 'virtual:windi.css'

dayjs.locale('zh-cn');

const pinpa = createPinia();
const app = createApp(App);

app.use(pinpa).use(router).use(initalGlobalRegister).mount('#app');

// jd micro
startMicroApp();

if (window.__MICRO_APP_BASE_APPLICATION__) {
  console.log('JD MicroApp 我是主应用')
}
