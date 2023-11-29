import { v4 as uuidV4 } from 'uuid';
/**
 * 获取一个8位ID
 * @description: 工具函数
 */
export const _uuid = (prefix: string) => {
  return `${prefix}_`.concat(uuidV4().slice(0, 8));
};
