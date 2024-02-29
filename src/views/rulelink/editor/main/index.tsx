import { defineComponent, ref, type PropType, onMounted, inject } from 'vue';
import styles from './index.module.scss';
import './vue-flow.css';
import { Panel, VueFlow, isEdge, isNode, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { initialElements, edges } from './tests';
import { Button } from 'tdesign-vue-next';
import { DrawerRuleTypeKey } from '../inject.key';
import { findIndex } from 'lodash-es';
import { _uuid } from '@/utils';
import type { RuleWidgetModels } from '@/constants/rule-widget.models';
import type { LayerSize } from '@/components/e-widget-render';

const RuleEditorView = defineComponent({
  name: 'RuleEditorView',
  props: {
    data: [Object, Array] as PropType<any>
  },
  setup() {
    const { nodesDraggable, addNodes, addEdges, updateEdge } = useVueFlow();
    const drawer = inject(DrawerRuleTypeKey);
    const elements = ref<any>(initialElements);
    const edgeElements = ref(edges);
    const newNode = ref({ id: '6', label: 'Node 6', position: { x: 400, y: 400 }, class: 'light' });

    const onInteractionChange = (lock: boolean) => {
      nodesDraggable.value = !lock;
      console.log('Interaction', lock);
    };

    const onConnect = (params: any) => {
      console.log('Edge connect', params);
      if (Reflect.has(params, 'source') && Reflect.has(params, 'target')) {
        const { source, target } = params;
        const newEdge: any = {
          id: `${source}-${target}-${edgeElements.value.length}`,
          source,
          target,
          animated: true,
          type: 'step',
          style: {stroke: '#faa'},
          label: 'edge',
          class: 'light'
        };
        console.log(newEdge)
        edgeElements.value.push(newEdge)
      }
    };

    const onEdgeUpdate = ({ edge, connection }: any) => {
      console.log('Edge update', edge, connection);
      updateEdge(edge, connection);
    };

    const onEdgeUpdateStart = (edge: any) => {
      console.log('Edge update start', edge);
    };

    const onEdgeUpdateEnd = (edge: any) => {
      console.log('Edge update end', edge);
    };

    const onEdgeClick = (params: any) => {
      console.log('Edge click', params);
      const { edge } = params;
      const edgeTargetIdx = findIndex(edgeElements.value, (item) => item.id === edge.id);
      console.log(edge.id, edgeTargetIdx);
      edgeElements.value.splice(edgeTargetIdx, 1);
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer?.getData('widget') as string;
      const widget = JSON.parse(data) as RuleWidgetModels;
      const ev = e as DragEvent & LayerSize;
      const [x, y] = [ev.layerX, ev.layerY];
      widget.id = _uuid('r');
      if (!widget.position) widget.position = { x: 0, y: 0 };
      widget.position.x = x;
      widget.position.y = y;
      // widget.class = 'light'
      console.log('rule end drop', widget);
      elements.value.push(widget);
    };

    onMounted(() => {
      // console.log('1.5s后将添加一个【node】节点');
      // setTimeout(() => {
      //   // 改变节点数据，则增加节点
      //   elements.value.push(newNode.value);
      // }, 1500);
    });

    return () => {
      return (
        <div
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          class={[styles.ruleEditorView, drawer?.value.widget ? styles.visible : '']}
        >
          <VueFlow
            id="vue-flow-id"
            class={styles.flowchart}
            nodes={elements.value}
            edges={edgeElements.value}
            // fit-view-on-init
            default-viewport={{ zoom: 1 }}
            min-zoom={0.2}
            max-zoom={4}
            onEdgeClick={onEdgeClick}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
          >
            {/* 背景 */}
            <Background gap={8} />
            {/* 控制 */}
            <Controls onInteractionChange={onInteractionChange} />
            {/* 小地图 */}
            <MiniMap />

            <Panel position={'top-left'}>
              <Button> panel button </Button>
            </Panel>
          </VueFlow>
        </div>
      );
    };
  }
});

export default RuleEditorView;

export interface RuleEditorViewInstance extends InstanceType<typeof RuleEditorView> {
  data: any;
}
