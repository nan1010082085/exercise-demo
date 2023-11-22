import { createApp } from 'vue';
import 'normalcss';
import './assets/index.scss';
import App from './App';
import pinpa from './store';
import router from './router';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);

app.use(pinpa).use(router)

app.mount('#app');
