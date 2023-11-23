import { debugMessage } from '@/constants/debug.models';
import { get } from 'lodash-es';

// 获取debug消息
export const getDebugMessage = (key: string): string => {
  return get(debugMessage, key);
};
