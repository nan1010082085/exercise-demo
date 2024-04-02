import { defineComponent, inject, ref } from 'vue';
import styles from './index.module.scss';
import { Button, Space, Tooltip, Divider, MessagePlugin } from 'tdesign-vue-next';
import { DrawerRuleTypeKey, RuleGraphHistoryKey, RuleGraphKey } from '../inject.key';
import type { DrawerRulePropertyType } from '../types';
import { Fullscreen2Icon, FullscreenExit1Icon, RollbackIcon, RollfrontIcon } from 'tdesign-icons-vue-next';
import ruleStore from '@/store/rule-store';

const RuleToobar = defineComponent({
  name: 'RuleToobar',
  emits: ['propertyChange', 'screen', 'save', 'undo', 'redo'],
  setup(_, { emit }) {
    const drawer = inject(DrawerRuleTypeKey);
    const graph = inject(RuleGraphKey);
    const hisotry = inject(RuleGraphHistoryKey);
    const screen = ref(false);
    
    const themeChange = (type: keyof DrawerRulePropertyType) => (drawer?.value[type] ? 'primary' : 'default');
    
    const onDrawer = (type: keyof DrawerRulePropertyType) => {
      if (!drawer) return;
      drawer.value[type] = !drawer.value[type];
    };
    
    const onScreen = () => {
      screen.value = !screen.value;
      const { body } = ruleStore();
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

    const onUndo = () => {
      graph?.value.undo();
    }
    const onRedo = () => {
      graph?.value.redo();
    }

    return () => {
      return (
        <div class={styles.toolbar}>
          <Space class={styles.toolbarLeft} size={'small'}>
            <Button onClick={onSave}>保存</Button>
          </Space>
          <Space class={styles.content} size={'small'} separator={() => <Divider layout="vertical" />}>
            <Tooltip content={'后退'}>
              <Button disabled={!hisotry?.undo} size={'small'} icon={() => <RollbackIcon />} onClick={onUndo}></Button>
            </Tooltip>
            <Tooltip content={'前进'}>
              <Button disabled={!hisotry?.redo} size={'small'} icon={() => <RollfrontIcon />} onClick={onRedo}></Button>
            </Tooltip>
          </Space>
          <Space class={[styles.toobarRight]} align='end' size={'small'}>
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

export interface RuleToobarInstance extends InstanceType<typeof RuleToobar> { }
