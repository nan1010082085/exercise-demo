import { type Graph } from '@antv/x6';
import styles from './index.module.scss';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Selection } from '@antv/x6-plugin-selection';
import { History } from '@antv/x6-plugin-history';

/**
 * 注册x6插件
 * @param graph 画布实例
 */
export const usePlugin = (graph: Graph) => {
  // 对齐线
  graph.use(new Snapline({ enabled: true, sharp: false, className: styles['snapline'], tolerance: 10 }));
  // 框选
  graph.use(
    new Selection({
      enabled: true,
      className: styles['selction'],
      multiple: false,
      // 显示创选描边
      showNodeSelectionBox: true,
      // showNodeSelectionBox 启用如无法响应事件，设置该值为none，默认auto
      pointerEvents: 'none'
    })
  );
  // 历史记录
  const noHistory = ['ports', 'tools', 'vertices'];
  graph.use(
    new History({
      enabled: true,
      beforeAddCommand: (event: any, args: any) => {
        const { key } = args;
        if (noHistory.includes(key)) return false;
        // console.log(event, args);
      }
    })
  );
};
