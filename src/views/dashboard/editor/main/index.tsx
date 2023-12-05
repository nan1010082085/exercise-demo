import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { widgetDefualt, type ManifestModels, type WidgetModels } from '@/constants/widget.models';
import { _uuid, isUndefinedOrNull } from '@/utils';
import EWidgetRender, {
  type LayerSize,
  type TouchType,
  type OffsetType,
  type GrabType
} from '@/components/e-widget-render';
import { dashboardStore } from '@/store/dashboard-store';
import * as Widgets from '@/widget';
import { cloneDeep } from 'lodash-es';
import useElement from '@/composables/useElement';
import useWidgetRenderFunc from '@/composables/useWidgetRender';

const EditorView = defineComponent({
  name: 'EditorView',
  components: {
    ...Widgets
  },
  setup() {
    const { board, getWidget, addWidget } = dashboardStore();
    const { getElementSize } = useElement();
    const { changeTouchWidget } = useWidgetRenderFunc();
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

    // 部件选中
    const activeWidget = ref<WidgetModels | null>(null);
    const activeOffset = ref<OffsetType>({
      l: 0,
      t: 0
    });
    const activeTouchType = ref<TouchType>('lt');
    const grabType = ref<GrabType>('grab');
    const isWidgetDwn = ref(false);
    const isTouchStart = ref(false);
    const isTouchCursor = ref(false);

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer?.getData('widget') as string;
      const manifest = JSON.parse(data) as ManifestModels;
      const widget = cloneDeep(widgetDefualt) as WidgetModels;
      const ev = e as DragEvent & LayerSize;
      const [x, y] = [ev.layerX, ev.layerY];
      widget.id = _uuid('w');
      widget.name = manifest.name;
      widget.type = manifest.type;
      widget.general.position.x = x;
      widget.general.position.y = y;
      widget.manifest = manifest;

      addWidget(widget);
    };

    const onMousemove = (e: MouseEvent) => {
      e.preventDefault();
      const size = getElementSize(document.getElementById(activeWidget.value?.id as string));
      const parentSize = getElementSize(viewRef.value);
      if (size && activeWidget.value && parentSize) {
        const ev = e as DragEvent & LayerSize;
        // 按下移动
        if (isWidgetDwn.value) {
          // 移动坐标
          const [x, y] = [ev.layerX - activeOffset.value.l, ev.layerY - activeOffset.value.t];
          // 父级限制坐标
          const [maxW, maxY] = [parentSize.width - size.width, parentSize.height - size.height];
          grabType.value = 'grabbing';
          activeWidget.value.general.position.x = x <= 0 ? 0 : x >= maxW ? maxW : x;
          activeWidget.value.general.position.y = y <= 0 ? 0 : y >= maxY ? maxY : y;
        }
        // 拖拽点
        if (isTouchStart.value) {
          changeTouchWidget(activeWidget.value, {
            type: activeTouchType.value,
            offset: activeOffset.value,
            layer: {
              x: ev.layerX,
              y: ev.layerY
            },
            size
          });
        }
      }
    };

    // 点击
    const active = (widget: WidgetModels | null) => {
      activeWidget.value = widget ? getWidget(widget.id as string) || null : null;
    };

    // 按下
    const activeWidgetDown = () => {
      grabType.value = 'grab';
      isWidgetDwn.value = true;
      isTouchStart.value = false;
    };

    // 拖拽改变部件大小
    const activeTouch = (type: TouchType) => {
      isTouchStart.value = true;
      isTouchCursor.value = true;
      activeTouchType.value = type;
    };

    const clearWidget = () => {
      grabType.value = 'grab';
      isWidgetDwn.value = false;
      isTouchStart.value = false;
      isTouchCursor.value = false;
      activeOffset.value = { l: 0, t: 0 };
    };

    const clearActiveWidget = () => {
      activeWidget.value = null;
    };

    onMounted(() => {});

    return () => {
      return (
        <div
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          onMousedown={clearActiveWidget}
          class={[styles['main-wrapper'], drawer?.value.widget ? styles.visible : '']}
        >
          <div class={styles.container}>
            <div
              ref={viewRef}
              class={[styles.canvas, isTouchCursor.value ? styles[activeTouchType.value] : '']}
              style={canvasStyle.value}
              onMousemove={onMousemove}
              onMouseup={clearWidget}
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
                    isActive={widget.id === activeWidget.value?.id}
                    grabType={grabType.value}
                    onActive={active}
                    onDown={activeWidgetDown}
                    onOffset={(offset) => (activeOffset.value = offset)}
                    onUp={clearWidget}
                    onTouch={activeTouch}
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
