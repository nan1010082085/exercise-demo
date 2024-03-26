import type { UserAdminModels, UserInfoModels, UserRoleModels } from '@/constants/user.models';
import apiHttp, { Method } from '@/plugins/axios-http';

export const getUserInfo = () => {
  return apiHttp.requset<UserInfoModels>({
    method: Method.GET,
    url: '/assets/json/user.json'
  });
};

export const getUserAmdinList = () => {
  return apiHttp.requset<UserAdminModels[]>({
    method: Method.GET,
    url: '/assets/json/user-admin.json'
  });
};

export const getUserRoleList = () => {
  return apiHttp.requset<UserRoleModels[]>({
    method: Method.GET,
    url: '/assets/json/user-role.json'
  });
};
