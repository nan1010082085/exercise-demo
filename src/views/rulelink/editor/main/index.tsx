import { defineComponent, ref, type PropType, onMounted, inject } from 'vue';
import styles from './index.module.scss';
import './vue-flow.css';
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { initialElements } from './tests';
import { Button } from 'tdesign-vue-next';
import { DrawerRuleTypeKey } from '../inject.key';

const RuleEditorView = defineComponent({
  name: 'RuleEditorView',
  props: {
    data: [Object, Array] as PropType<any>
  },
  setup() {
    const { nodesDraggable } = useVueFlow();
    const drawer = inject(DrawerRuleTypeKey);
    const elements = ref(initialElements);
    const newNode = ref({ id: '6', label: 'Node 6', position: { x: 400, y: 400 }, class: 'light' });

    const onInteractionChange = (lock: boolean) => {
      nodesDraggable.value = !lock;
      console.log('Interaction', lock);
    };

    const onEdgeUpdateStart = (edge: any) => {
      console.log('Edge update start', edge);
    };

    onMounted(() => {
      console.log('1.5s后将添加一个【node】节点');
      setTimeout(() => {
        // 改变节点数据，则增加节点
        elements.value.push(newNode.value);
      }, 1500);
    });

    return () => {
      return (
        <div class={[styles.ruleEditorView, drawer?.value.widget ? styles.visible : '']}>
          <VueFlow
            id="vue-flow-id"
            class={styles.flowchart}
            v-model={elements.value}
            // fit-view-on-init
            default-viewport={{ zoom: 1 }}
            min-zoom={0.2}
            max-zoom={4}
            onEdgeUpdateStart={onEdgeUpdateStart}
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
