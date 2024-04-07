import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { widgetDefualt, type ManifestModels, type WidgetModels } from '@/constants/widget.models';
import { Collapse, CollapsePanel, Image as TImage } from 'tdesign-vue-next';
import widgetConfig from '@board-models/widget/lib/config';
import { dashboardStore } from '@/store/dashboard-store';
import { cloneDeep } from 'lodash-es';
import { _uuid, mainfestInstall } from '@/utils';
import usePlugin from '@/composables/usePlugin';

const WidgetDrawer = defineComponent({
  name: 'WidgetDrawer',
  setup() {
    const { addWidget } = dashboardStore();
    const widgetsConfig = computed<string[]>(() => Object.keys(widgetConfig));
    const drawer = inject(DrawerTypeKey);
    const defaultValue = ref([0]);
    const { reserveCreateImage, dragImage } = usePlugin();

    const widgetClick = (e: MouseEvent, manifest: ManifestModels) => {
      const widget = cloneDeep(widgetDefualt) as WidgetModels;
      widget.id = _uuid('w');
      widget.manifest = manifest;
      addWidget(widget);
    };

    const onDragStart = (e: DragEvent, manifest: ManifestModels) => {
      e.dataTransfer?.setData('widget', JSON.stringify(manifest));
      e.dataTransfer?.setDragImage(dragImage.value, 1, 1);
    };

    onMounted(() => {
      reserveCreateImage();
    });

    return () => {
      return (
        <div class={[styles['widget-drawer'], drawer?.value.widget ? styles.visible : '']}>
          <Collapse defaultValue={defaultValue.value}>
            {widgetsConfig.value.map((widgetConfigKey) => {
              const widgetKey = widgetConfig[widgetConfigKey];
              const widgtKeys = widgetKey.children;
              return (
                <CollapsePanel key={widgetKey.title} class={styles['widget-panel']} header={widgetKey.title}>
                  {widgtKeys.map((type: string) => {
                    const manifest = mainfestInstall(type, 'board-models');
                    return (
                      <div
                        key={type}
                        draggable={true}
                        onDragstart={(e: DragEvent) => onDragStart(e, manifest)}
                        onDragover={(e) => e.preventDefault()}
                        class={styles['widget-card']}
                        onClick={(e: MouseEvent) => widgetClick(e, manifest)}
                      >
                        <div class={styles['widget-card-icon']}>
                          <TImage fit={'cover'} src={manifest.icon} />
                        </div>
                        <div class={styles['widget-card-name']}>{manifest.name}</div>
                      </div>
                    );
                  })}
                </CollapsePanel>
              );
            })}
          </Collapse>
        </div>
      );
    };
  }
});

export default WidgetDrawer;

export interface WidgetDrawerInstance extends InstanceType<typeof WidgetDrawer> {}
