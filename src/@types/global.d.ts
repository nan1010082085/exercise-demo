/**
 * @description: 全局增加window对象属性
 */
export {};

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };

    // JD
    __MICRO_APP_BASE_APPLICATION__: any;
    unmount: () => void;
  }

  interface ComponentPublicInstance {
    $pinia: Pinia;
  }
}
