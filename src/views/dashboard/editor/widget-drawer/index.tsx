import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { type ManifestModels } from '@/constants/widget.models';
import { Collapse, CollapsePanel, Image as TImage } from 'tdesign-vue-next';
import widgetConfig from '@widget/lib/config';
import { mainfestInstall } from '@/widget/lib/manifest';
const dargSrc = new URL('@public/vite.svg', import.meta.url).href;

const WidgetDrawer = defineComponent({
  name: 'WidgetDrawer',
  setup() {
    const widgetsConfig = computed<string[]>(() => Object.keys(widgetConfig));
    const drawer = inject(DrawerTypeKey);
    const defaultValue = ref([0]);
    const img = ref();

    const reserveCreateImage = () => {
      img.value = document.createElement('img');
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      let linearGradient = ctx.createLinearGradient(0, 0, 50, 50);
      linearGradient.addColorStop(0, '#fff');
      linearGradient.addColorStop(0.5, '#fff');
      linearGradient.addColorStop(1, '#eee');
      ctx['fillStyle'] = linearGradient;
      ctx['lineJoin'] = 'round';
      ctx['strokeStyle'] = linearGradient;
      ctx?.fillRect(0, 0, 50, 50);
      ctx?.beginPath();
      ctx?.lineTo(0, 0);
      ctx?.lineTo(50, 0);
      ctx?.lineTo(0, 0);
      ctx?.lineTo(0, 50);
      ctx?.closePath();
      ctx?.stroke();
      img.value.src = canvas.toDataURL('image/jpg');
    };

    const onDragStart = (e: DragEvent, manifest: ManifestModels) => {
      console.log('drag start', manifest);
      e.dataTransfer?.setData('widget', JSON.stringify(manifest));
      e.dataTransfer?.setDragImage(img.value, 1, 1);
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
                <CollapsePanel class={styles['widget-panel']} header={widgetKey.title}>
                  {widgtKeys.map((type: string) => {
                    const manifest = mainfestInstall(type);
                    return (
                      <div
                        key={type}
                        draggable={true}
                        onDragstart={(e: DragEvent) => onDragStart(e, manifest)}
                        onDragover={(e) => e.preventDefault()}
                        class={styles['widget-card']}
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
