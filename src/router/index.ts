import { createRouter, createWebHashHistory, type RouteRecordRaw, type Router } from 'vue-router';
import { useGlobalStore } from '@/store/global-store';
import PagePaths from './path/page';
import TextView from './path/text-view';
import FlowPaths from './path/flow';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layout'),
    children: [...PagePaths, ...FlowPaths]
  },
  {
    path: '/test-v',
    name: 'TestV',
    component: () => import('@/test-v'),
    children: TextView
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/login')
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
  const { setBreadcrumbHistory } = useGlobalStore();
  const { name, path, meta } = to;
  const history = { name, path, meta } as RouteRecordRaw;
  setBreadcrumbHistory(history);
  next();
});

export default router;
