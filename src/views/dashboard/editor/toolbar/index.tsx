import { defineComponent, inject, ref } from 'vue';
import styles from './index.module.scss';
import { Button, Space, Tooltip } from 'tdesign-vue-next';
import { DrawerTypeKey } from '../inject.key';
import type { DrawerPropertyType } from '../types';
import { Fullscreen2Icon, FullscreenExit1Icon } from 'tdesign-icons-vue-next';

const Toolbar = defineComponent({
  name: 'Toolbar',
  emits: ['save', 'propertyChange', 'screen'],
  setup(_, { emit }) {
    const drawer = inject(DrawerTypeKey);
    const screen = ref(false);

    const themeChange = (type: keyof DrawerPropertyType) => (drawer?.value[type] ? 'primary' : 'default');

    const onDrawer = (type: keyof DrawerPropertyType) => {
      emit('propertyChange', type);
    };

    const onScreen = () => {
      emit('screen', (screen.value = !screen.value));
    };

    const onSave = () => {
      emit('save');
    };

    return () => {
      return (
        <div class={styles.toolbar}>
          <div class={styles.btns}>
            <Button onClick={onSave}>保存</Button>
          </div>
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
