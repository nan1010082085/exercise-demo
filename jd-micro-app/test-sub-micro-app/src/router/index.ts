import { createRouter, createWebHashHistory } from 'vue-router';

const DefaultPorjectBaseUrl = '/project'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: DefaultPorjectBaseUrl + '/my-app',
      name: 'MyApp',
      component: () => import('@/views/home')
    },
    {
      path: DefaultPorjectBaseUrl + '/user',
      name: 'User',
      component: () => import('@/views/user')
    }
  ]
});

export default router;
