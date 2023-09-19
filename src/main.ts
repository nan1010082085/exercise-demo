import { createApp } from 'vue';
import 'normalcss';
import './assets/index.scss';
import App from './App';
import router from './router';
import pinpa from './store';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);

app.use(router).use(pinpa);

app.mount('#app');
