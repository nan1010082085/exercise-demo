/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-23 11:05:14
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-23 11:05:14
 * @Description
 */

export interface DebugGlobalProps {
  type: string;
  path?: string;
  alias?: string;
  message: any;
  status: 'success' | 'error' | 'info';
}

class DebugGlobal {
  path: string;
  status: string;
  statusBgColor: string;
  env: string;
  constructor(option: DebugGlobalProps) {
    const { type, path, alias = '', message, status } = option;
    this.env = import.meta.env.VITE_APP_DEBUG;
    this.path = this.getPath(path);
    const { t, c } = this.getStatus(status);
    this.status = t;
    this.statusBgColor = c;
    this.init(type, alias, message);
  }

  init(type: string, alias: string, message: any) {
    alias = alias ? ` (${alias})` : '';
    message = typeof message === 'string' ? message : JSON.stringify(message);
    const bgStatus = `background: linear-gradient(${this.statusBgColor});border-radius:2px;padding:2px 2px;font-weight:bold;color:#000`;
    const bgType = 'background: linear-gradient(#00f, #00f);border-radius:2px;padding:2px 2px;color:#fff';
    this.env &&
      console.log(
        `%c${this.status}%c: %c[${type}]${alias}%c ${message} ${this.path}`,
        bgStatus,
        '',
        bgType,
        'color:#000'
      );
  }

  getPath(path: string | undefined): string {
    return path ? `\n${path}` : '';
  }

  getStatus(status: DebugGlobalProps['status']): { t: string; c: string } {
    switch (status) {
      case 'error':
        return { t: `error`, c: '#f00, #fff,#fff, #f00' };
      case 'success':
        return { t: `success`, c: '#0f0, #fff, #fff, #0f0' };
      default:
        return { t: `info`, c: '#00f, #fff, #fff, #00f' };
    }
  }
}

export default DebugGlobal;
