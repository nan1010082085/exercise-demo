import { createRouter, createWebHashHistory, type RouteRecordRaw, type Router } from 'vue-router';
import cardPaths from './path/card';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layout'),
    children: cardPaths
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/login')
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/home')
  },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect')
  }
];

const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

const { beforeEach } = router;

// 全局前置守卫
beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router;
