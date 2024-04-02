import { defineComponent, inject, ref } from 'vue';
import styles from './index.module.scss';
import { Button, MessagePlugin, Space, Tooltip } from 'tdesign-vue-next';
import { DrawerTypeKey } from '../inject.key';
import type { DrawerPropertyType } from '../types';
import { Fullscreen2Icon, FullscreenExit1Icon } from 'tdesign-icons-vue-next';
import { dashboardStore } from '@/store/dashboard-store';

const Toolbar = defineComponent({
  name: 'Toolbar',
  emits: ['save', 'propertyChange', 'screen'],
  setup(_, { emit }) {
    const drawer = inject(DrawerTypeKey);
    const screen = ref(false);

    const themeChange = (type: keyof DrawerPropertyType) => (drawer?.value[type] ? 'primary' : 'default');

    const onDrawer = (type: keyof DrawerPropertyType) => {
      if (!drawer) return;
      drawer.value[type] = !drawer.value[type];
    };

    const onScreen = () => {
      screen.value = !screen.value;
      const { body } = dashboardStore();
      if (document.fullscreenEnabled) {
        screen.value ? body?.requestFullscreen() : document?.exitFullscreen();
      } else {
        screen.value = false;
        MessagePlugin.warning('当前浏览器不支持全屏');
      }
    };

    const onSave = () => {
      emit('save');
    };

    return () => {
      return (
        <div class={styles.toolbar}>
          <Space size={'small'} class={styles.btns}>
            <Button onClick={onSave}>保存</Button>
          </Space>
          <div class={styles.content}></div>
          <Space size={'small'} class={styles.btns}>
            <Tooltip content={screen.value ? '退出全屏' : '全屏'}>
              <Button onClick={onScreen} icon={() => (screen.value ? <FullscreenExit1Icon /> : <Fullscreen2Icon />)} />
            </Tooltip>
            <Button theme={themeChange('widget')} onClick={() => onDrawer('widget')}>
              部件
            </Button>
          </Space>
        </div>
      );
    };
  }
});

export default Toolbar;

export interface ToolbarInstance extends InstanceType<typeof Toolbar> { }
