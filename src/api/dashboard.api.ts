import type { DashboardListModels } from '@/constants/dashboard.models';
import apiHttp, { Method } from '@/plugins/axios-http';

export const getDashboardList = () => {
  return apiHttp.requset<DashboardListModels[]>({
    method: Method.GET,
    url: '/public/assets/json/dashboard.json'
  });
};
