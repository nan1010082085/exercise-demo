import { type Graph } from '@antv/x6';
import { unref } from 'vue';
import { usePortsInteractive } from './useInteractive';

/**
 * 节点监听事件
 * @param graph 画布实例
 * @param activeNode 
 */
export const useNodeFunction = (graph: Graph, activeNode: any) => {
  const { visiblePorts } = usePortsInteractive();
  graph.on('node:mouseenter', ({ node }: any) => {
    visiblePorts(node, node.getPorts(), 1);
  });
  graph.on('node:mouseleave', ({ node }: any) => {
    visiblePorts(node, node.getPorts(), 0);
  });
};

/**
 * 边监听事件
 * @param graph 画布实例 
 * @param activeEdge 选中的边
 */
export const useEdgetFuntion = (graph: Graph, activeEdge: any) => {
  // 增加连接线上工具
  graph.on('edge:mouseenter', ({ cell }: any) => {
    if (cell === unref(activeEdge)) {
      cell.addTools([
        'vertices',
        'segments',
        {
          name: 'button-remove',
          args: { distance: 20 }
        }
      ]);
    }
  });

  graph.on('edge:mouseleave', ({ cell }: any) => {
    if (cell === unref(activeEdge)) {
      if (cell.hasTool('vertices')) {
        cell.removeTool('vertices');
      }
      if (cell.hasTool('segments')) {
        cell.removeTool('segments');
      }
      if (cell.hasTool('button-remove')) {
        cell.removeTool('button-remove');
      }
    }
  });
};
