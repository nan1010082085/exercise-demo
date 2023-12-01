/**
 * @Author Yang (yang dong nan)
 * @Date 2023-12-01 13:52:34
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-12-01 13:52:34
 * @Description 导出部件配置
 */

import type { ManifestModels } from '@/constants/widget.models';

const mainfestInstall = (type: ManifestModels['type']) => {
  const manifestDefault = import.meta.glob('./*/config/manifest.ts', { eager: true, import: 'default' });
  return manifestDefault[`./${type}/config/manifest.ts`] as ManifestModels;
};

export { mainfestInstall };
