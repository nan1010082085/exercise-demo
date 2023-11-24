/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-24 15:20:40
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-24 15:20:40
 * @Description 仪表盘
 */

export interface DashboardListModels {
  id: string | number;
  name: string;
  description: string;
  url: string;
  prevewImage: string;
  author: string;
  status: number;
  createtime: string;
  updatetime: string;
}
