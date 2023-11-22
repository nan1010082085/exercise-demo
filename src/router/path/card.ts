import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      icon: 'home'
    },
    component: () => import('@/home')
  },
  {
    name: 'PersonWork',
    path: '/person-work',
    meta: {
      title: '工作台',
      icon: 'user'
    },
    component: () => import('@/views/person-work')
  }
];
