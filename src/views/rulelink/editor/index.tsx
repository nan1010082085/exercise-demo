import { defineComponent, provide, ref } from 'vue';
import styles from './index.module.scss';
import type { DrawerRulePropertyType } from './types';
import { DrawerRuleTypeKey } from './inject.key';
import RuleEditorView from './main';

const RuleEditor = defineComponent({
  name: 'RuleEditor',
  setup() {
    const drawer = ref<DrawerRulePropertyType>({
      widget: true
    });
    provide(DrawerRuleTypeKey, drawer);

    return () => {
      return (
        <div class={styles['editor-rule']}>
          <RuleEditorView />
        </div>
      );
    };
  }
});

export default RuleEditor;
