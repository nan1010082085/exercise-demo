import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { widgetDefualt, type ManifestModels, type WidgetModels } from '@/constants/widget.models';
import { _uuid } from '@/utils';
import EWidgetRender, { type LayerSize } from '@/components/e-widget-render';
import { dashboardStore } from '@/store/dashboard-store';
import * as Widgets from '@/widget';
import { cloneDeep, debounce } from 'lodash-es';
import useElement from '@/composables/useElement';

const EditorView = defineComponent({
  name: 'EditorView',
  components: {
    ...Widgets
  },
  setup() {
    const { getElementSize } = useElement();
    const { board, getWidget, addWidget } = dashboardStore();
    const drawer = inject(DrawerTypeKey);
    const viewRef = ref();
    const widgets = computed(() => {
      return board?.widgets as WidgetModels[];
    });
    const canvasStyle = computed(() => {
      return {
        width: `${board?.general.position.width}px`,
        height: `${board?.general.position.height}px`
      };
    });

    // 选中
    const activeWdiget = ref<WidgetModels | null>(null);
    const activeOffset = ref({
      l: 0,
      t: 0
    });

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer?.getData('widget') as string;
      const manifest = JSON.parse(data) as ManifestModels;
      const widget = cloneDeep(widgetDefualt) as WidgetModels;
      const ev = e as DragEvent & LayerSize;
      const [x, y] = [ev.layerX, ev.layerY];
      widget.id = _uuid('w');
      widget.general.position.x = x;
      widget.general.position.y = y;
      widget.manifest = manifest;

      addWidget(widget);
    };

    const onMousemove = (e: MouseEvent) => {
      e.preventDefault();
      const size = getElementSize(document.getElementById(activeWdiget.value?.id as string));
      const parentSize = getElementSize(viewRef.value);
      if (size && activeWdiget.value && parentSize) {
        const ev = e as DragEvent & LayerSize;
        // 移动坐标
        const [x, y] = [ev.layerX - activeOffset.value.l, ev.layerY - activeOffset.value.t];
        // 父级限制坐标
        const [maxW, maxY] = [parentSize.width - size.width, parentSize.height - size.height];
        activeWdiget.value.general.position.x = x <= 0 ? 0 : x >= maxW ? maxW : x;
        activeWdiget.value.general.position.y = y <= 0 ? 0 : y >= maxY ? maxY : y;
      }
    };

    const activeWidget = (widget: WidgetModels | null, offset: { l: number; t: number } = { l: 0, t: 0 }) => {
      activeOffset.value = offset;
      activeWdiget.value = widget ? getWidget(widget.id as string) || null : null;
    };

    onMounted(() => {});

    return () => {
      return (
        <div
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          class={[styles['main-wrapper'], drawer?.value.widget ? styles.visible : '']}
        >
          <div class={styles.container}>
            <div
              ref={viewRef}
              class={styles.canvas}
              style={canvasStyle.value}
              onMousemove={onMousemove}
              onMouseup={() => activeWidget(null)}
            >
              {widgets.value.map((widget) => {
                const { x, y, width: w, height: h } = widget.general.position;

                return (
                  <EWidgetRender
                    key={widget.id}
                    widget={widget}
                    x={x}
                    y={y}
                    w={w}
                    h={h}
                    onDown={activeWidget}
                    onUp={activeWidget}
                  >
                    {widget.name}
                  </EWidgetRender>
                );
              })}
            </div>
          </div>
        </div>
      );
    };
  }
});

export default EditorView;
