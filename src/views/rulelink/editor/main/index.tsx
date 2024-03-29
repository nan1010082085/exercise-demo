import { defineComponent, ref, type PropType, onMounted, inject, computed, watch, watchPostEffect } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import { _uuid } from '@/utils';
import type { RuleWidgetModels } from '@/constants/rule-widget.models';
import { Graph, Shape } from '@antv/x6';
import { register, getTeleport } from '@antv/x6-vue-shape'
import { Snapline } from '@antv/x6-plugin-snapline'
import RuleText from '@/rule/lib/text';
import useElement from '@/composables/useElement';
import { Connecting, Grid, Highlighting, Panning, Ports } from './x6-config';
import { usePortsInteractive } from './useInteractive';

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
    const { getElRect } = useElement();
    const { visiblePorts } = usePortsInteractive();

    const size = computed(() => getElRect(mainRef.value as HTMLDivElement))
    const container = ref<{ left: number, top: number }>();

    // watch mounted el.size
    watch(() => size.value, (val) => {
      if (val) {
        container.value = {
          left: val.x,
          top: val.y
        }
      }
    }, { flush: 'post' })

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer?.getData('widget') as string;
      const widget = JSON.parse(data) as RuleWidgetModels;
      const ev = e as DragEvent
      const { left = 0, top = 0 } = container.value ?? {}
      const [x, y] = [ev.pageX - left, ev.pageY - top];
      widget.id = _uuid('r');
      if (!widget.position) widget.position = { x: 0, y: 0 };
      widget.position.x = x;
      widget.position.y = y;
      console.log('rule end drop', widget);
      addNode(RuleText.name, { x, y, w: 240, h: 40 }, widget);
    };

    const graph = ref();
    const graphRef = ref()

    // html 节点
    const registerHtml = () => {
      return Shape.HTML.register({
        shape: 'html-text',
        // width: 100,
        // height: 100,
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
        width: 240,
        height: 40,
        component: RuleText,
        data: {
          text: 'test rule x6 Custom Vue Component',
        },
      })
    }

    const addNode = (shape: string, option: { x: number, y: number, w?: number, h?: number }, data?: any) => {
      const { x, y, w = 200, h = 100 } = option;
      return graph.value.addNode({
        shape: shape,
        x,
        y,
        width: w,
        height: h,
        attrs: {
          body: {
            fill: '#fff',
            stroke: '#000',
            strokeWidth: 1,
          }
        },
        data,
        ports: Ports
      })
    }

    onMounted(() => {
      graph.value = new Graph({
        container: graphRef.value as HTMLDivElement,
        grid: Grid,
        panning: Panning,
        autoResize: true,
        connecting: Connecting,
        highlighting: Highlighting
      })
      // graph use plugin
      graph.value.use(new Snapline({ enabled: true, tolerance: 10 }))
      // register node
      registerHtml();
      registerVueNode();

      // graph add nodes
      addNode('circle', { x: 20, y: 20, w: 60, h: 60 });
      addNode('rect', { x: 100, y: 100, w: 100, h: 100 });
      addNode('html-text', { x: 120, y: 120 });
      addNode(RuleText.name, { x: 200, y: 200, w: 240, h: 40 });

      // graph addEventListener;
      graph.value.on('node:mouseenter', ({ node }: any) => {
        // console.log('node:mouseenter', node);
        visiblePorts(node, node.getPorts(), 1)
      })
      graph.value.on('node:mouseleave', ({ node }: any) => {
        // console.log('node:mouseleave', node);
        visiblePorts(node, node.getPorts(), 0)
      })

      let json = graph.value.toJSON();
      console.log(json)
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
