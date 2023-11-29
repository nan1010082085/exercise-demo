import { defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import type { WidgetModels } from '@/constants/widget.models';
import { _uuid } from '@/utils';
import EWidgetRender from '@/components/e-widget-render';
import { dashboardStore } from '@/store/dashboard-store';

const EditorView = defineComponent({
  name: 'EditorView',
  setup() {
    const { board } = dashboardStore();

    const drawer = inject(DrawerTypeKey);

    const widgets = ref<WidgetModels[]>([]);

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      console.log('drop view', e);
      const data = e.dataTransfer?.getData('widget') as string;
      console.log(data);
      const widget = JSON.parse(data) as WidgetModels;
      const [x, y] = [e.offsetX, e.offsetY];
      widget.id = _uuid('w');
      widget.general.position.x = x;
      widget.general.position.y = y;
      console.log(widget);
      widgets.value.push(widget);
    };

    onMounted(() => {
      widgets.value = (board?.widgets as WidgetModels[]) ?? [];
    });

    return () => {
      return (
        <div
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          class={[styles['main-wrapper'], drawer?.value.widget ? styles.visible : '']}
        >
          {widgets.value.map((widget) => {
            const { x, y, width: w, height: h } = widget.general.position;

            return (
              <EWidgetRender key={widget.id} widget={widget} x={x} y={y} w={w} h={h}>
                {widget.name}
              </EWidgetRender>
            );
          })}
        </div>
      );
    };
  }
});

export default EditorView;
