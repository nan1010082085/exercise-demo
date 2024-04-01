import { type Graph } from '@antv/x6';
import { unref } from 'vue';
export const useEdget = (graph: Graph, activeEdge: any) => {
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
