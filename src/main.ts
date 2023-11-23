import { createApp } from 'vue';
import 'normalcss';
import './assets/index.scss';
import App from './App';
import pinpa from './store';
import router from './router';
import 'tdesign-vue-next/es/style/index.css';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

dayjs.locale('zh-cn');

const app = createApp(App);

app.use(pinpa).use(router)

app.mount('#app');
