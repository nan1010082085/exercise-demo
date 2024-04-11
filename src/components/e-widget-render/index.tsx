import { computed, defineComponent, onMounted, onUnmounted, toValue, type PropType } from 'vue';
import type { WidgetModels } from '@/@types/widget';
import useElementSize, { type ElRect } from '@/composables/useElement';
import EFoundationSupport from '../e-foundation-support'
import { dashboardStore } from '@/store/dashboard-store';
import { useElementBounding } from '@vueuse/core';

const EWidgetRender = defineComponent({
  name: 'EWidgetRender',
  props: {
    widget: {
      type: Object as PropType<WidgetModels>,
      default: () => ({})
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    page: {
      type: String as PropType<string | HTMLDivElement>,
      default: null
    },
    parent: {
      type: Boolean as PropType<boolean>,
      default: false
    },
  },
  emits: [],
  setup(_, { emit, slots }) {
    const { resetToBounbs } = useElementSize();
    const boardStore = dashboardStore

    const activeSet = computed(() => new Set(boardStore().active))

    const getParentSize = () => {
      let el = _.page instanceof HTMLDivElement ? _.page : document.querySelector(_.page) as HTMLDivElement;
      const { width, height } = useElementBounding(el);
      return [toValue(width), toValue(height)];
    }

    const handleActivated = (widget: WidgetModels, shiftKey?: boolean) => {
      boardStore().activated(widget, shiftKey)
    }

    const hanldeResizing = (widget: WidgetModels, position: ElRect) => {
      const [maxLeft, maxTop] = getParentSize()
      let x = resetToBounbs(position.left, 0, maxLeft - position.width)
      let y = resetToBounbs(position.top, 0, maxTop - position.height);
      widget.general.position.x = x;
      widget.general.position.y = y;
      widget.general.position.width = position.width;
      widget.general.position.height = position.height;
    }

    onMounted(() => { });

    onUnmounted(() => { })

    return () => {
      const { id, general } = _.widget;
      const { x, y, width, height, z } = general.position;
      const active = activeSet.value.has(_.widget)

      return (
        <EFoundationSupport
          key={id}
          id={id}
          x={x}
          y={y}
          w={width}
          h={height}
          page={_.page}
          parent={_.parent}
          zIndex={z}
          active={active}
          disabled={_.disabled}
          onActivated={(shiftKey?: boolean) => handleActivated(_.widget, shiftKey)}
          onResizing={(position) => {
            hanldeResizing(_.widget, position);
          }}
        >
          {slots.default?.()}
        </EFoundationSupport>
      );
    };
  }
});

export default EWidgetRender;
