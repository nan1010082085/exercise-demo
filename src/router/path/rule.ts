import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'Editr',
    path: '/editor',
    meta: {
      title: '编辑规则链',
      icon: ''
    },
    component: () => import('@/views/rulelink')
  }
];
