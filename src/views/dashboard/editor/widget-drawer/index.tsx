import { defineComponent, inject, ref, watch } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { widgetDefualt, type WidgetModels } from '@/constants/widget.models';
import { Image } from 'tdesign-vue-next';

const defaultData = [widgetDefualt, widgetDefualt, widgetDefualt];

const WidgetDrawer = defineComponent({
  name: 'WidgetDrawer',
  setup() {
    const widgets = ref<WidgetModels[]>(defaultData);
    const drawer = inject(DrawerTypeKey);

    const onDragStart = (e: DragEvent, widget: WidgetModels) => {
      console.log('drag start', widget);
      e.dataTransfer?.setData('widget', JSON.stringify(widget));
      const dragImage = document.createElement('div');
      dragImage.classList.add('drag-image');
      e.dataTransfer?.setDragImage(dragImage, 10, 10);
    };

    return () => {
      return (
        <div class={[styles['widget-drawer'], drawer?.value.widget ? styles.visible : '']}>
          {widgets.value.map((widget) => {
            return (
              <div
                draggable={true}
                onDragstart={(e: DragEvent) => onDragStart(e, widget)}
                onDragover={(e) => e.preventDefault()}
                class={styles['widget-card']}
              >
                <div class={styles['widget-card-icon']}>
                  <Image fit={'cover'} src={widget.icon} />
                </div>
                <div class={styles['widget-card-name']}>{widget.name}</div>
              </div>
            );
          })}
        </div>
      );
    };
  }
});

export default WidgetDrawer;
