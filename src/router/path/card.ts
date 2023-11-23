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
    name: 'PersonWork',
    path: '/person-work',
    meta: {
      title: '工作台',
      icon: 'control-platform'
    },
    component: () => import('@/views/person-work')
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
