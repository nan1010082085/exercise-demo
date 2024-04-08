import { defineComponent, ref, type PropType, onMounted, inject, computed, watch, reactive, onBeforeMount } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import { _uuid } from '@/utils';
import { Graph } from '@antv/x6';
import { getTeleport } from '@antv/x6-vue-shape';
import * as flowWidgets from '@flow-models/widget/lib';
import useElement from '@composables/useElement';
import { ActiveEdge, Connecting, Grid, Highlighting, Panning, Ports } from './x6-config';
import { usePlugin } from './x6-use';
import { useEdgetFuntion, useNodeFunction } from './x6-function';
import { customRegister } from './x6-custom-register';

const TeleportComponent = getTeleport();

const RuleEditorView = defineComponent({
  name: 'RuleEditorView',
  components: { TeleportComponent },
  emits: ['update:modelValue', 'history'],
  props: {
    modelValue: [Object, Array] as PropType<any>,
    data: [Object, Array] as PropType<any>
  },
  setup(_, { emit }) {
    const drawer = inject(DrawerRuleTypeKey);
    const mainRef = ref();
    const { getElRect } = useElement();

    const size = computed(() => getElRect(mainRef.value as HTMLDivElement))
    const container = ref<{ left: number, top: number }>();

    const graph = ref();
    const graphRef = ref()
    const activeNode = ref();
    const activeEdge = ref();
    const history = reactive({
      redo: false,
      undo: false
    })

    // reset styles
    const resetEdget = ref()

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
      const widget = JSON.parse(data);
      const ev = e as DragEvent
      const { left = 0, top = 0 } = container.value ?? {}
      // proprety
      widget.id = _uuid('r_');
      // poisiton 
      const [x, y] = [ev.pageX - left, ev.pageY - top];
      if (!widget.position) widget.position = { x: 0, y: 0 };
      widget.position.x = x;
      widget.position.y = y;
      // console.log('rule end drop', widget);
      addNode(widget.type as string, { x, y, w: 100, h: 100 }, widget);
    };

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

    const installWidget = () => {
      Object.keys(flowWidgets).forEach((key) => {
        const component = (flowWidgets as any)[key]
        customRegister().vueNode(component);
      })
    }

    onBeforeMount(() => {
      installWidget();
    })

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
      usePlugin(graph.value)

      // 选中的节点
      graph.value.on('node:selected', ({ node }: any) => {
        // console.log('node:click', node);
        activeNode.value = node;
      })

      // 选中的连接线（边）
      graph.value.on('edge:selected', ({ edge }: any) => {
        // console.log('edge:click', edge);
        if (activeEdge.value) {
          resetEdget.value && activeEdge.value.setAttrs(resetEdget.value)
          resetEdget.value = null;
        }
        resetEdget.value = edge.getAttrs();
        edge.setAttrs(ActiveEdge)
        activeEdge.value = edge;
      })

      // 添加边
      graph.value.on('edge:added', ({ edge }: any) => {
        if (activeEdge.value) {
          resetEdget.value && activeEdge.value.setAttrs(resetEdget.value)
          resetEdget.value = null;
        }
        edge.setAttrs({
          line: {
            stroke: '#000',
            strokeDasharray: 5,
            targetMarker: 'classic',
            style: {
              animation: `${styles['ant-line']} 30s infinite linear`,
            },
          }
        })
        // activeEdge.value = edge;
      })

      useNodeFunction(graph.value, activeNode);
      useEdgetFuntion(graph.value, activeEdge)

      graph.value.on('blank:click', () => {
        activeNode.value = null;
        resetEdget.value && activeEdge.value.setAttrs(resetEdget.value)
        activeEdge.value = null;
        resetEdget.value = null;
      })

      graph.value.on('history:change', () => {
        history.redo = graph.value.canRedo();
        history.undo = graph.value.canUndo();
        emit('history', history)
      })

      emit('update:modelValue', graph.value)

      // console.log(_.data)
      // 渲染导入数据
      if (_.data) {
        graph.value.fromJSON(_.data)
      }
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
