import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      icon: 'dashboard'
    },
    component: () => import('@/views/home')
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      title: '仪表板',
      icon: 'control-platform'
    },
    component: () => import('@/views/dashboard')
  },
  {
    name: 'rulelink',
    path: '/rulelink',
    meta: {
      title: '规则链',
      icon: 'link-1'
    },
    component: () => import('@/views/rulelink')
  },
  {
    name: 'termianl',
    path: '/termianl',
    meta: {
      title: '终端',
      icon: 'code'
    },
    component: () => import('@/views/terminal')
  },
  {
    name: 'assets',
    path: '/assets',
    meta: {
      title: '资产',
      icon: 'view-module'
    },
    children: [
      {
        name: 'widget',
        path: '/assets/widget',
        meta: {
          title: '仪表板部件',
          icon: 'share'
        },
        component: () => import('@board-models/widget')
      },
      {
        name: 'flow',
        path: '/assets/flow',
        meta: {
          title: '流程部件',
          icon: 'link'
        },
        component: () => import('@flow-models/widget')
      }
    ]
  },
  {
    name: 'User',
    path: '/user',
    meta: {
      title: '个人中心',
      icon: 'user-setting'
    },
    component: () => import('@/views/user')
  },
  {
    name: 'Admin',
    path: '/admin',
    meta: {
      title: '系统',
      icon: 'setting'
    },
    children: [
      {
        name: 'UserAdmin',
        path: '/admin/user-admin',
        meta: {
          title: '用户管理',
          icon: 'user-list'
        },
        component: () => import('@/views/user-admin')
      },
      {
        name: 'UserRole',
        path: '/admin/user-role',
        meta: {
          title: '角色管理',
          icon: 'user-safety'
        },
        component: () => import('@/views/user-role')
      }
    ]
  }
];
