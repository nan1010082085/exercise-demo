import { computed, defineComponent, ref, type PropType } from 'vue';
import styles from './index.module.scss';
import type { WidgetModels } from '@/constants/widget.models';

export type LayerSize = { layerX: number; layerY: number };

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
      // validator(value: number) {
      //   console.log(!isNaN(value))
      //   return !isNaN(value);
      // },
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
    }
  },
  emits: ['down', 'up'],
  setup(_, { emit, slots }) {
    const size = computed(() => [_.x, _.y, _.w, _.h]);
    const stylesheet = computed(() => {
      const [x, y, w, h] = size.value;
      console.log('widget size', x, y, w, h);
      return {
        width: `${w}px`,
        height: `${h}px`,
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    });
    const widget = computed(() => _.widget);

    const onMousedown = (e: MouseEvent & LayerSize) => {
      if (_.static) return;
      e.preventDefault();
      const [l, t] = [e.layerX - _.x, e.layerY - _.y];
      emit('down', widget.value, { l, t });
    };

    const onMouseover = (e: MouseEvent) => {
      emit('up', null);
    };

    const onMouseup = (e: MouseEvent) => {
      e.stopPropagation();
      emit('up', null);
    };

    return () => {
      return (
        <div
          id={widget.value.id}
          class={styles.eWidgetContainer}
          style={stylesheet.value}
          onMousedown={(e) => onMousedown(e as MouseEvent & LayerSize)}
          onMouseover={onMouseover}
          onMouseup={onMouseup}
        >
          {slots.default?.()}
        </div>
      );
    };
  }
});

export default EWidgetRender;
