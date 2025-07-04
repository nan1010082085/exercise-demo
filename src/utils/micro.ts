/**
 * @description: 注册微前端
 */

import microApp from '@micro-zoe/micro-app';

export const startMicroApp = () => {
  microApp.start({ iframe: true });
}
