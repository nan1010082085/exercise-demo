import { defineComponent, ref, type PropType, onMounted, inject, computed } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import { _uuid } from '@/utils';
import type { RuleWidgetModels } from '@/constants/rule-widget.models';
import type { LayerSize } from '@/components/e-widget-render';
import { Graph, Shape } from '@antv/x6';
import { register, getTeleport } from '@antv/x6-vue-shape'
import RuleText from '@/rule/lib/text';
import useElement from '@/composables/useElement';

const TeleportComponent = getTeleport();

const RuleEditorView = defineComponent({
  name: 'RuleEditorView',
  components: { TeleportComponent },
  props: {
    data: [Object, Array] as PropType<any>
  },
  setup() {
    const drawer = inject(DrawerRuleTypeKey);
    const mainRef = ref();
    const { getElRect } = useElement()

    const size = computed(() => getElRect(mainRef.value as HTMLDivElement))

    // watch mounted el.size
    // watch(() => size.value, (val) => {
    //   console.log(val)
    // }, { flush: 'post' })

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      // const data = e.dataTransfer?.getData('widget') as string;
      // const widget = JSON.parse(data) as RuleWidgetModels;
      // const ev = e as DragEvent & LayerSize;
      // const [x, y] = [ev.layerX, ev.layerY];
      // widget.id = _uuid('r');
      // if (!widget.position) widget.position = { x: 0, y: 0 };
      // widget.position.x = x;
      // widget.position.y = y;
      // // widget.class = 'light'
      // console.log('rule end drop', widget);
      // elements.value.push(widget);
    };

    const graph = ref();
    const graphRef = ref()

    // html 节点
    const registerHtml = () => {
      return Shape.HTML.register({
        shape: 'html-text',
        width: 100,
        height: 100,
        html() {
          const div = document.createElement('div');
          div.className = styles['html-text'];
          div.innerHTML = `Shape = Html <br/> HTML-DIV-TEXT`
          return div;
        }
      });
    }

    const registerVueNode = () => {
      return register({
        shape: RuleText.name,
        width: 150,
        height: 100,
        component: RuleText,
        data: {
          text: 'test rule x6 Custom Vue Component',
        }
      })
    }

    const addNode = (shape: string, x: number = 0, y: number = 0) => {
      return graph.value.addNode({
        shape: shape,
        x,
        y,
        width: 200,
        height: 100,
      })
    }

    onMounted(() => {
      // Graph.registerNode(RuleText.name, RuleText, true);
      registerHtml();
      registerVueNode();
      graph.value = new Graph({
        container: graphRef.value as HTMLDivElement,
        grid: {
          size: 10,
          visible: true
        },
        autoResize: true,
      })

      addNode('circle', 20, 20);
      addNode('rect', 100, 100);
      addNode('html-text', 120, 120);
      addNode(RuleText.name, 200, 200);
    });

    return () => {
      return (
        <div
          ref={mainRef}
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          class={[styles.ruleEditorView, drawer?.value.widget ? styles.visible : '']}
        >
          <div ref={graphRef}></div>
          <TeleportComponent />
        </div>
      );
    };
  }
});

export default RuleEditorView;

export interface RuleEditorViewInstance extends InstanceType<typeof RuleEditorView> {
  data: any;
}
