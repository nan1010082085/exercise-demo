import { defineComponent, ref, provide, onMounted } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import styles from './index.module.scss';
import useDialog from '@/composables/useDialog';
import WidgetDrawer from './widget-drawer';
import Toolbar from './toolbar';
import type { DrawerPropertyType } from './types';
import { DrawerTypeKey } from './inject.key';
import EditorView from './main';
import { dashboardStore } from '@/store/dashboard-store';

const BoardEditor = defineComponent({
  name: 'BoardEditor',
  setup() {
    const router = useRouter();
    const { confirm } = useDialog();
    const editorRef = ref<HTMLDivElement>();
    const { addBody } = dashboardStore();
    const buttonType = ref<'' | 'save'>('');

    const drawer = ref<DrawerPropertyType>({
      widget: true,
      auxiliary: true
    });
    provide(DrawerTypeKey, drawer);

    // 路由守卫
    onBeforeRouteLeave((to, form, next) => {
      if (buttonType.value === 'save') {
        next();
      } else {
        confirm('确定要离开吗？', '离开后不会保存已编辑的操作！', { theme: 'warning' }).then(({ trigger }) => {
          if (trigger === 'confirm') {
            next();
          }
          next(false);
        });
      }
    });

    const saveChange = () => {
      buttonType.value = 'save';
      confirm('确认', '确认保存当前仪表板吗？', { theme: 'info' }).then(({ trigger }) => {
        if (trigger === 'confirm') {
          router.push('/dashboard');
        } else {
          buttonType.value = '';
        }
      });
    };

    onMounted(() => {
      addBody(editorRef);
    })

    return () => {
      return (
        <div ref={editorRef} class={styles.editor}>
          <Toolbar onSave={saveChange} />
          <WidgetDrawer />
          <EditorView />
        </div>
      );
    };
  }
});

export default BoardEditor;
