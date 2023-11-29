import { computed, defineComponent, ref, type PropType } from 'vue';
import styles from './index.module.scss';
import type { WidgetModels } from '@/constants/widget.models';

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
    }
  },
  emits: [],
  setup(_, { emit, slots }) {
    const size = computed(() => {
      return {
        x: _.x,
        y: _.y,
        w: _.w,
        h: _.h
      };
    });

    const stylesheet = ref({
      width: `${size.value.w}px`,
      height: `${size.value.h}px`,
      transform: `translate3d(${size.value.x}px, ${size.value.y}px, 0)`
    });

    const widget = computed(() => _.widget);

    const onMousedown = (e: MouseEvent) => {
      if (_.static) return;
      e.preventDefault();
      console.log('render on mouse down', e);
    };

    return () => {
      return (
        <div id={widget.value.id} class={styles.eWidgetContainer} style={stylesheet.value} onMousedown={onMousedown}>
          {slots.default?.()}
        </div>
      );
    };
  }
});

export default EWidgetRender;
