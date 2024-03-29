import { computed, defineComponent, ref, type PropType } from 'vue';
import styles from './index.module.scss';
import type { WidgetModels } from '@/constants/widget.models';

export type LayerSize = { layerX: number; layerY: number };
export type OffsetType = { l: number; t: number };
export type TouchType = 'lt' | 'lc' | 'lb' | 'ltc' | 'rt' | 'rc' | 'rb' | 'rbc';
const touchKeys: TouchType[] = ['lt', 'lc', 'lb', 'ltc', 'rt', 'rc', 'rb', 'rbc'];

const EWidgetRender = defineComponent({
  name: 'EWidgetRender',
  props: {
    static: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    widget: {
      type: Object as PropType<WidgetModels>,
      default: () => ({})
    },
    x: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    y: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    w: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    h: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    // 是否选中，选中显示拖拽点
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['active', 'offset', 'down', 'up', 'touch'],
  setup(_, { emit, slots }) {
    const stylesheet = computed(() => {
      const {x, y, w, h} = _;
      return {
        width: `${w}px`,
        height: `${h}px`,
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    });
    const widget = computed(() => _.widget);
    const isDown = ref(false);
    const timer = ref<NodeJS.Timeout>();
    const onMousedown = (e: MouseEvent & LayerSize) => {
      if (_.static) return;
      e.stopPropagation();
      timer.value && clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        isDown.value = true;
        const [l, t] = [e.layerX - _.x, e.layerY - _.y];
        emit('offset', { l, t });
        emit('down');
      }, 16);
      emit('active', widget.value);
    };

    const onMouseup = (e: MouseEvent) => {
      e.stopPropagation();
      if (isDown.value) {
        emit('up');
      }
    };

    const onTouch = (e: MouseEvent & LayerSize, type: TouchType) => {
      e.stopPropagation();
      if (isDown.value) {
        const [l, t] = [e.layerX - _.x, e.layerY - _.y];
        emit('offset', { l, t });
        emit('touch', type);
      }
    };

    return () => {
      const touchDom = _.isActive
        ? touchKeys.map((key, i) => {
            return (
              <div
                key={i}
                class={[styles.round, styles[key]]}
                onMousedown={(e) => onTouch(e as MouseEvent & LayerSize, key)}
                onMouseup={onMouseup}
              ></div>
            );
          })
        : null;
      return (
        <div
          id={widget.value.id}
          class={[styles.eWidgetContainer]}
          style={stylesheet.value}
          onMousedown={(e) => onMousedown(e as MouseEvent & LayerSize)}
          onMouseup={onMouseup}
        >
          {slots.default?.()}
          {/* 选中后显示拖拽位置点 */}
          {touchDom}
        </div>
      );
    };
  }
});

export default EWidgetRender;
