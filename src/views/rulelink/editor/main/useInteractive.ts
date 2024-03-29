/**
 * @description: 控制连接桩交互
 */
export const usePortsInteractive = () => {
  /**
   * @description: 显示隐藏连接桩
   * @param {any} node 节点对象
   * @param {any | any[]} ports 连接桩ID 或 连接桩ID数组
   * @param {number} opacity 0 - 1
   * @return {*}
   */
  const visiblePorts = (node: any, ports: any | any[], opacity: number = 1): any => {
    if (Array.isArray(ports)) {
      if (ports.length > 0) {
        ports.forEach((port: { id: string }) => {
          node.setPortProp(port.id, 'attrs/circle', {
            opacity: opacity
          });
        });
      }
    } else {
      node.setPortProp(ports, 'attrs/circle', {
        opacity: opacity
      });
    }
  };

  return {
    visiblePorts
  };
};
