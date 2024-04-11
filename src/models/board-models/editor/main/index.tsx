import { computed, defineComponent, inject, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerTypeKey } from '../inject.key';
import { type ManifestModels, type WidgetModels } from '@/@types/widget';
import { _uuid } from '@/utils';
import EWidgetRender from '@/components/e-widget-render';
import { dashboardStore } from '@/store/dashboard-store';
import * as Widgets from '@board-models/widget/lib';
import { cloneDeep } from 'lodash-es';
import { useElementBounding } from '@vueuse/core'
import { widgetDefualt } from '@/constants/widget.models';

const EditorView = defineComponent({
  name: 'EditorView',
  components: {
    ...Widgets
  },
  setup() {
    const boardStore = dashboardStore;
    const drawer = inject(DrawerTypeKey);
    const viewRef = ref<HTMLDivElement>();
    const { left, top } = useElementBounding(viewRef);
    const widgets = computed<WidgetModels[]>(() => {
      return boardStore().board?.widgets ?? [];
    });

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer?.getData('widget') as string;
      const manifest = JSON.parse(data) as ManifestModels;
      const widget = cloneDeep(widgetDefualt) as WidgetModels;
      const ev = e as DragEvent;
      const [x, y] = [ev.pageX - left.value, ev.pageY - top.value];
      widget.id = _uuid('w_');
      widget.name = manifest.name;
      widget.type = manifest.type;
      let { position } = widget.general;
      position.x = x;
      position.y = y;
      position.z = widgets.value.length + 1;
      widget.manifest = manifest;
      boardStore().add(widget);
    };

    return () => {
      const page = boardStore().board?.general.position;
      const ml = drawer?.value.ruler ? 25 : 0;
      const mt = drawer?.value.ruler ? 25 : 0;
      return (
        <div
          onDragover={(e) => e.preventDefault()}
          onDrop={onDrop}
          style={{
            marginLeft: ml + 'px',
            marginTop: mt + 'px',
          }}
          class={[styles['page'], drawer?.value.widget ? styles.visible : '']}
        >
          <div
            ref={viewRef}
            id={'board-main-editor'}
            class={[styles.canvas]}
            style={{
              width: page?.width + 'px',
              height: page?.height as number + 'px',
            }}
          >
            {widgets.value.map((widget) => {
              return (
                <EWidgetRender
                  key={widget.id}
                  widget={widget}
                  page={'#board-main-editor'}
                  parent={false}
                >
                  {widget.name}
                </EWidgetRender>
              );
            })}
          </div>
        </div>
      );
    };
  }
});

export default EditorView;

export interface EditorViewInstance extends InstanceType<typeof EditorView> { }
