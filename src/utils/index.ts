import { v4 as uuidV4 } from 'uuid';
import type { ManifestModels } from '@/constants/widget.models';
/**
 * 获取一个8位ID
 * @description: 工具函数
 */
export const _uuid = (prefix: string) => {
  return `${prefix}_`.concat(uuidV4().slice(0, 8));
};

export const isUndefinedOrNull = (value: any) => {
  return value === undefined || value === null;
};

/**
 * @Author Yang (yang dong nan)
 * @Date 2023-12-01 13:52:34
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-12-01 13:52:34
 * @Description 导出部件配置
 */
export const mainfestInstall = (type: ManifestModels['type'], prefix: string) => {
  const manifestDefault = import.meta.glob(`@/models/**/*/config/manifest.ts`, { eager: true, import: 'default' });
  const filterManifest = Object.keys(manifestDefault).filter((item) => item.includes(prefix));
  const key = filterManifest[filterManifest.findIndex((item) => item.includes(type))];
  return manifestDefault[key] as ManifestModels;
};
