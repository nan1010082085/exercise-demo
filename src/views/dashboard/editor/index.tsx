import { defineComponent, ref, provide } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import styles from './index.module.scss';
import useDialog from '@/composables/useDialog';
import WidgetDrawer from './widget-drawer';
import Toolbar from './toolbar';
import type { DrawerPropertyType } from './types';
import { DrawerTypeKey } from './inject.key';
import { MessagePlugin } from 'tdesign-vue-next';
import EditorView from './main';

const Editor = defineComponent({
  name: 'Editor',
  setup() {
    const route = useRoute();
    const { confirm } = useDialog();
    const editorRef = ref<HTMLElement>();

    const drawer = ref<DrawerPropertyType>({
      widget: true
    });
    provide(DrawerTypeKey, drawer);

    onBeforeRouteLeave((to, form, next) => {
      confirm('确定要离开吗？', '离开后不会保存已编辑的操作！').then(({ trigger }) => {
        if (trigger === 'confirm') {
          next();
        }
        next(false);
      });
    });

    const drwerPropertyChange = (type: keyof DrawerPropertyType) => {
      drawer.value[type] = !drawer.value[type];
    };

    const saveChange = () => {
      console.log('widget save');
    };

    const screenChange = (value: boolean) => {
      if (document.fullscreenEnabled) {
        value ? editorRef.value?.requestFullscreen() : document?.exitFullscreen();
      } else {
        MessagePlugin.warning('当前浏览器不支持全屏');
      }
    };

    return () => {
      return (
        <div ref={editorRef} class={styles.editor}>
          <Toolbar onPropertyChange={drwerPropertyChange} onSave={saveChange} onScreen={screenChange} />
          <WidgetDrawer />
          <EditorView />
        </div>
      );
    };
  }
});

export default Editor;
