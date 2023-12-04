import { computed, defineComponent, ref, type PropType } from 'vue';
import styles from './index.module.scss';
import type { WidgetModels } from '@/constants/widget.models';

export type LayerSize = { layerX: number; layerY: number };
export type OffsetType = { l: number; t: number };
export type TouchType = 'lt' | 'lc' | 'lb' | 'ltc' | 'rt' | 'rc' | 'rb' | 'rbc';
export type GrabType = 'grab' | 'grabbing';
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
    // 选中拖拽鼠标样式
    grabType: {
      type: String as PropType<GrabType>,
      default: 'grab'
    },
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['active', 'offset', 'down', 'up', 'touch'],
  setup(_, { emit, slots }) {
    const size = computed(() => [_.x, _.y, _.w, _.h]);
    const stylesheet = computed(() => {
      const [x, y, w, h] = size.value;
      return {
        width: `${w}px`,
        height: `${h}px`,
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    });
    const widget = computed(() => _.widget);
    const isDown = ref(false);
    const isGrab = ref(false);
    const timer = ref<NodeJS.Timeout>();

    const onMousedown = (e: MouseEvent & LayerSize) => {
      if (_.static) return;
      e.stopPropagation();
      timer.value && clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        isGrab.value = true;
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
        isGrab.value = false;
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
        ? touchKeys.map((key) => {
            return (
              <div
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
          class={[styles.eWidgetContainer, isGrab.value ? styles[_.grabType] : '']}
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
