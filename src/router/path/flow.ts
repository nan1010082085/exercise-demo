import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'RuleEditor',
    path: '/rule-editor',
    meta: {
      title: '编辑规则链',
      icon: ''
    },
    component: () => import('@flow-models/editor')
  }
];
