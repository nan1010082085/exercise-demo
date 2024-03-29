import { computed, defineComponent, inject, onMounted, ref, watchEffect } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { widgetDefualt, type ManifestModels, type WidgetModels } from '@/constants/widget.models';
import { _uuid, isUndefinedOrNull } from '@/utils';
import EWidgetRender, { type LayerSize, type TouchType, type OffsetType } from '@/components/e-widget-render';
import { dashboardStore } from '@/store/dashboard-store';
import * as Widgets from '@/widget';
import { cloneDeep } from 'lodash-es';
import useElement from '@/composables/useElement';
import useWidgetRenderFunc, { type AuxiliaryResult } from '@/composables/useWidgetRender';
import { useMouseInElement } from '@vueuse/core';

const EditorView = defineComponent({
  name: 'EditorView',
  components: {
    ...Widgets
  },
  setup() {
    const { board, getWidget, addWidget } = dashboardStore();
    const { getElementSize } = useElement();
    const { changeTouchWidget, getAuxiliary } = useWidgetRenderFunc();
    const drawer = inject(DrawerTypeKey);
    const viewRef = ref(null);
    // const { x, y, elementX, elementY, isOutside } = useMouseInElement(viewRef);
    const widgets = computed(() => {
      return board?.widgets as WidgetModels[];
    });
    const canvasStyle = computed(() => {
      return {
        width: `${board?.general.position.width}px`,
        height: `${board?.general.position.height}px`
      };
    });
    // 辅助线
    const auxiliarys = ref<AuxiliaryResult>();
    // 部件选中
    const activeWidget = ref<WidgetModels | null>(null);
    const activeOffset = ref<OffsetType>({
      l: 0,
      t: 0
    });
    const activeTouchType = ref<TouchType>('lt');
    const isWidgetDwn = ref(false);
    const isTouchStart = ref(false);
    const isTouchCursor = ref(false);

    // watchEffect(() => {
    //   console.log(viewRef.value)
    //   console.log(x.value, y.value);
    //   console.log('element', elementX.value, elementY.value);
    //   console.log(isOutside.value)
    // }, { flush: 'post' })

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
      if (isWidgetDwn.value && !isTouchStart.value) {
      }
      if (size && activeWidget.value && parentSize) {
        const ev = e as DragEvent & LayerSize;
        // 按下移动
        if (isWidgetDwn.value) {
          // 移动坐标
          const [x, y] = [ev.layerX - activeOffset.value.l, ev.layerY - activeOffset.value.t];
          // 父级限制坐标
          const [maxW, maxY] = [parentSize.width - size.width, parentSize.height - size.height];
          activeWidget.value.general.position.x = x <= 0 ? 0 : x >= maxW ? maxW : x;
          activeWidget.value.general.position.y = y <= 0 ? 0 : y >= maxY ? maxY : y;

          showAuxiliary();
        }
        // 拖拽点
        if (isTouchStart.value) {
          console.log(ev.layerX, ev.layerY);
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
      showAuxiliary();
    };

    // 按下
    const activeWidgetDown = () => {
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
      isWidgetDwn.value = false;
      isTouchStart.value = false;
      isTouchCursor.value = false;
      activeOffset.value = { l: 0, t: 0 };
      auxiliaryAlgin();
    };

    // 清除选中和辅助线
    const clearActiveWidget = () => {
      activeWidget.value = null;
      auxiliarys.value = { h: [], v: [] };
    };

    // 辅助线
    const showAuxiliary = () => {
      if (drawer?.value.auxiliary && activeWidget.value) {
        auxiliarys.value = getAuxiliary(activeWidget.value, widgets.value);
      }
    };

    // 辅助线对齐
    const auxiliaryAlgin = () => {
      if (auxiliarys.value && activeWidget.value) {
        const { h, v } = auxiliarys.value;
        if (h.length) {
          activeWidget.value.general.position.y = h[0].algin;
        }
        if (v.length) {
          activeWidget.value.general.position.x = v[0].algin;
        }
      }
    };

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
              onMousedown={clearActiveWidget}
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

            <div class={styles.h}>
              {auxiliarys.value?.h.map((h, i) => {
                return (
                  <span
                    key={i}
                    style={{ left: `${h.x}px`, top: `${h.y}px`, width: `${h.len}px` }}
                    class={[styles.line]}
                  ></span>
                );
              })}
            </div>
            <div class={styles.v}>
              {auxiliarys.value?.v.map((v, i) => {
                return (
                  <span
                    key={i}
                    style={{ left: `${v.x}px`, top: `${v.y}px`, height: `${v.len}px` }}
                    class={[styles.line]}
                  ></span>
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

export interface EditorViewInstance extends InstanceType<typeof EditorView> {}
