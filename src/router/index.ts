import { createRouter, createWebHashHistory, type RouteRecordRaw, type Router } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout'),
    children: []
  },
  {
    path: '/login',
    component: () => import('@/login')
  },
  {
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
  // console.log(to, from);
  next()
});

export default router;
