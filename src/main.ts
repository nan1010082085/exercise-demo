import { createApp } from 'vue';
import 'normalcss';
import './assets/index.scss';
import App from './App';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(router).use(store);

app.mount('#app');
