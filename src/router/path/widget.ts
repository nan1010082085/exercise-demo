import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'Editr',
    path: '/editor',
    meta: {
      title: '编辑仪表盘',
      icon: ''
    },
    component: () => import('@/views/dashboard/editor')
  }
];
