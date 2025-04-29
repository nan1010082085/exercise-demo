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
      title: '流程图',
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
    name: 'Map',
    path: '/map',
    meta: {
      title: '地图',
      icon: 'map'
    },
    component: () => import('@/views/map'),
    children: []
  },
  {
    name: 'UniverDoc',
    path: '/univer-doc',
    meta: {
      title: '电子文档',
      icon: 'file-word'
    },
    component: () => import('@/views/univer-doc'),
    children: []
  },
  {
    name: 'UniverSheet',
    path: '/univer-sheet',
    meta: {
      title: '电子表格',
      icon: 'table'
    },
    component: () => import('@/views/univer-sheet'),
    children: []
  },
  {
    name: 'ExcelToTable',
    path: '/excel-to-table',
    meta: {
      title: 'xls转表格',
      icon: 'table'
    },
    component: () => import('@/views/excelToTable'),
    children: []
  },
  {
    name: 'PreviewPdf',
    path: '/preview-pdf',
    meta: {
      title: 'PDF预览',
      icon: 'table'
    },
    component: () => import('@/views/previewPdf'),
    children: []
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
