import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'PersonWork',
    path: '/person-work',
    component: () => import('@/views/person-work')
  }
];
