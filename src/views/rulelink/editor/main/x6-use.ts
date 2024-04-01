import { type Graph } from '@antv/x6';
import styles from './index.module.scss';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Selection } from '@antv/x6-plugin-selection';
import { History } from '@antv/x6-plugin-history';

export const usePlugin = (graph: Graph) => {
  // 对齐线
  graph.use(new Snapline({ enabled: true, className: styles['snapline'], tolerance: 10 }));
  // 框选
  graph.use(new Selection({ enabled: true }));
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
