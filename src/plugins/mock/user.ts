import type { UserInfoModels } from '@/@types/user';
import mock from '../http/mock';

export const userInfo: UserInfoModels = {
  name: 'Yang Dong nan',
  wechat: 'nan1010082085',
  qq: '1010082085',
  email: 'nan1010082085@163.com',
  phone: '',
  isPush: false
};

mock.onGet('/user-info').reply(200, userInfo);
