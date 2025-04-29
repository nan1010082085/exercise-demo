import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { initalGlobalRegister } from '@plugins/global';
import App from './App';
// micro
import { initWujie, startMicroApp } from './utils/micro';

import 'dayjs/locale/zh-cn';
import { dayjs } from 'element-plus';
import 'virtual:windi.css'

dayjs.locale('zh-cn');

const pinpa = createPinia();
const app = createApp(App);

app.use(pinpa).use(router).use(initalGlobalRegister).use(initWujie);

/// wujie
// initWujie(app);

// jd micro
startMicroApp();

// if (window.__POWERED_BY_WUJIE__) {
//   console.log('wujie')
// }

// if (window.__MICRO_APP_BASE_APPLICATION__) {
//   console.log('JD MicroApp 我是主应用')
// }
