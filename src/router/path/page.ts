import type { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      icon: 'dashboard'
    },
    component: () => import('@/home')
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
          title: '部件库',
          icon: 'share'
        },
        component: () => import('@/widget')
      },
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
  },
];
