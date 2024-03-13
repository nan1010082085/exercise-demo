import { createApp, type App as AppInstance } from 'vue';
import './style.css';
import App from './App.tsx';

const app = createApp(App) as AppInstance;

// app.use((req: any, res: any) => {
//   res.set({
//     'Access-Control-Allow-Credentials': true,
//     'Access-Control-Allow-Origin': req.headers.origin || '*',
//     'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
//     'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
//     'Content-Type': 'application/json; charset=utf-8'
//   });
// });

declare global {
  interface Window {
    $wujie: any;
  }
}

console.log("app main", window)
console.log("app main", window.$wujie)

app.mount('#app');
