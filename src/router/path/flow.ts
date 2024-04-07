import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'BoardEditor',
    path: '/board-editor',
    meta: {
      title: '编辑仪表盘',
      icon: ''
    },
    component: () => import('@board-models/editor')
  },
  {
    name: 'FlowEditor',
    path: '/flow-editor',
    meta: {
      title: '编辑规则链',
      icon: ''
    },
    component: () => import('@flow-models/editor')
  }
];
