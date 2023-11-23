import type { UserInfoModels } from '@/constants/user.models';
import apiHttp, { Method } from '@/plugins/axios-http';

export const getUserInfo = () => {
  return apiHttp.requset<UserInfoModels>({
    method: Method.GET,
    url: '/public/assets/json/user.json'
  });
};
