import { defineComponent, provide, ref } from 'vue';
import styles from './index.module.scss';
import type { DrawerRulePropertyType } from './types';
import { DrawerRuleTypeKey } from './inject.key';
import RuleToobar from './toolbar';
import RuleDrawer from './rule-drawer';
import RuleEditorView from './main';
import { MessagePlugin } from 'tdesign-vue-next';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import useDialog from '@/composables/useDialog';

const RuleEditor = defineComponent({
  name: 'RuleEditor',
  setup() {
    const router = useRouter();
    const ruleEditorRef = ref();
    const { confirm } = useDialog();
    const drawer = ref<DrawerRulePropertyType>({
      widget: true
    });
    provide(DrawerRuleTypeKey, drawer);
    const buttonType = ref('');

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

    const drwerPropertyChange = (type: keyof DrawerRulePropertyType) => {
      drawer.value[type] = !drawer.value[type];
    };

    const screenChange = (value: boolean) => {
      if (document.fullscreenEnabled) {
        value ? ruleEditorRef.value?.requestFullscreen() : document?.exitFullscreen();
      } else {
        MessagePlugin.warning('当前浏览器不支持全屏');
      }
    };

    const saveChange = () => {
      buttonType.value = 'save';
      confirm('确认', '确认保存当前规则链吗？', { theme: 'info' }).then(({ trigger }) => {
        if (trigger === 'confirm') {
          router.push('/dashboard');
        } else {
          buttonType.value = '';
        }
      });
    };

    return () => {
      return (
        <div ref={ruleEditorRef} class={styles['editor-rule']}>
          <RuleToobar onPropertyChange={drwerPropertyChange} onScreen={screenChange} onSave={saveChange} />
          <RuleDrawer />
          <RuleEditorView />
        </div>
      );
    };
  }
});

export default RuleEditor;
