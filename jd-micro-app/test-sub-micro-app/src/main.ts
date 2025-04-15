import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router';

const Pinia = createPinia();
createApp(App).use(Pinia).use(router).mount('#app')
