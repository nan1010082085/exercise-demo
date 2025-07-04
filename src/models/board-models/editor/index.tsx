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
import { ElScrollbar } from 'element-plus';
import dashboardBase from '@public/default-json/dashboard.base.json';
import TooolFooter from './footer';
import ToolRuler from './ruler';

const BoardEditor = defineComponent({
  name: 'BoardEditor',
  setup() {
    const router = useRouter();
    const { confirm } = useDialog();
    const editorRef = ref<HTMLDivElement>();
    const { createdBoard, scroll } = dashboardStore();
    const buttonType = ref<'' | 'save'>('');

    const drawer = ref<DrawerPropertyType>({
      widget: true,
      ruler: true,
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

    const handleScroll = (scrollTop: number, scrollLeft: number) => {
      // console.log(scrollTop, scrollLeft);
      scroll({
        scrollTop,
        scrollLeft
      })
    }

    onMounted(() => {
      createdBoard(dashboardBase)
    })

    return () => {
      return (
        <div ref={editorRef} class={styles.editor}>
          <Toolbar onSave={saveChange} />
          <div class={styles.container}>
            <WidgetDrawer />
            <div id="board-canvas-view" class={[styles.scroll, {
              [styles.visibale_widget]: !drawer.value.widget,
            }]}>
              <ToolRuler />
              <ElScrollbar
                onScroll={({ scrollTop, scrollLeft }) => { handleScroll(scrollTop, scrollLeft) }}>
                <EditorView />
              </ElScrollbar>
            </div>
          </div>
          <TooolFooter />
        </div>
      );
    };
  }
});

export default BoardEditor;
