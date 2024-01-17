import { defineComponent, inject, ref } from 'vue';
import styles from './index.module.scss';
import { Button, Space, Tooltip } from 'tdesign-vue-next';
import { DrawerRuleTypeKey } from '../inject.key';
import type { DrawerRulePropertyType } from '../types';
import { Fullscreen2Icon, FullscreenExit1Icon } from 'tdesign-icons-vue-next';

const RuleToobar = defineComponent({
  name: 'RuleToobar',
  emits: ['propertyChange', 'screen', 'save'],
  setup(_, { emit }) {
    const drawer = inject(DrawerRuleTypeKey);
    const screen = ref(false);

    const themeChange = (type: keyof DrawerRulePropertyType) => (drawer?.value[type] ? 'primary' : 'default');

    const onDrawer = (type: keyof DrawerRulePropertyType) => {
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
          <Space size={'small'}>
            <Button onClick={onSave}>保存</Button>
          </Space>
          <div></div>
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

export default RuleToobar;

export interface RuleToobarInstance extends InstanceType<typeof RuleToobar> {}
