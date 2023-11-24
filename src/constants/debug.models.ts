// debug 类型（导航级别）
export enum DebugType {
  HTTP_REQUSET = 'HTTP请求',
  HTTP_RESPONSE = 'HTTP响应',
  PERSON_WORK = '工作台',
  USER = '个人中心',
  USER_ADMIN = '用户管理',
  USER_ROLE = '角色管理',
}

export const debugMessage = {
  user: {
    'on-save': '保存用户信息'
  }
};
