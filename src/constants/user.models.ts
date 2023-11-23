// 用户信息
export interface UserInfoModels {
  name: string;
  wechat: string;
  qq: string;
  email: string;
  phone: string;
  isPush: boolean;
}

export interface UserAdminModels extends UserInfoModels {
  id: string;
  createdAt: string;
  updatedAt: string;
}
