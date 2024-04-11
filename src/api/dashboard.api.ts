import type { DashboardListModels } from '@/@types/board';
import apiHttp, { Method } from '@/plugins/http';

export const getDashboardList = () => {
  return apiHttp.requset<DashboardListModels[]>({
    method: Method.GET,
    url: '/assets/json/dashboard.json'
  });
};
