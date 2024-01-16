import { defineComponent, ref, type PropType } from 'vue';
import styles from './index.module.scss';
import './vue-flow.css';
import { Panel, VueFlow, isNode, useVueFlow } from '@vue-flow/core';
import { Node } from 'useVueFlow';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { initialElements } from './tests';
import { Button } from 'tdesign-vue-next';

const RuleEditorView = defineComponent({
  name: 'RuleEditorView',
  props: {
    data: [Object, Array] as PropType<any>
  },
  setup() {
    const { nodesDraggable } = useVueFlow();
    const elements = ref(initialElements);

    const onInteractionChange = (lock: boolean) => {
      nodesDraggable.value = !lock;
      console.log('Interaction', lock);
    };

    return () => {
      return (
        <div class={styles.ruleEditorView}>
          <VueFlow
            id="vue-flow-id"
            class={styles.flowchart}
            v-model={elements.value}
            // fit-view-on-init
            default-viewport={{ zoom: 1.5 }}
            // nodesDraggable={controls.value.lock}
            min-zoom={0.2}
            max-zoom={4}
          >
            <Background gap={8} />
            <Controls onInteractionChange={onInteractionChange} />
            <MiniMap />

            <Panel position={'top-left'}>
              <Button>1</Button>
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
