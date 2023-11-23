/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-23 11:05:14
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-23 11:05:14
 * @Description
 */

import { useRoute } from 'vue-router';

export interface DebugGlobalProps {
  type: string;
  path?: string;
  alias?: string;
  message: string;
  status: 'success' | 'error' | 'info';
}

class DebugGlobal {
  route = useRoute();
  path: string;
  status: string;
  constructor(option: DebugGlobalProps) {
    const { type, path, alias = '', message, status } = option;
    this.path = this.getPath(path);
    this.status = this.getStatus(status);
    this.init(type, alias, message);
  }

  init(type: string, alias: string, message: string) {
    console.log(`[${type}] ${alias} ${this.status} ${message} ${this.path}`);
  }

  getPath(path: string | undefined): string {
    return path ? `\n ${path}` : '';
  }

  getStatus(status: DebugGlobalProps['status']): string {
    switch (status) {
      case 'error':
        return `error :`;
      case 'success':
        return `success :`;
      default:
        return `info :`;
    }
  }
}

export default DebugGlobal;
