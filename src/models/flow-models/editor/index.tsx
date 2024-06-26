import { defineComponent, onMounted, provide, reactive, ref } from 'vue';
import styles from './index.module.scss';
import type { DrawerRulePropertyType } from './types';
import { DrawerRuleTypeKey, RuleGraphHistoryKey, RuleGraphKey } from './inject.key';
import RuleToobar from './toolbar';
import RuleDrawer from './widget-drawer';
import RuleEditorView from './main';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import useDialog from '@/composables/useDialog';
import ruleStore from '@/store/rule-store';

const RuleEditor = defineComponent({
  name: 'RuleEditor',
  setup() {
    const router = useRouter();
    const { addBody } = ruleStore();
    const ruleEditorRef = ref<HTMLDivElement>();
    const { confirm } = useDialog();
    const buttonType = ref('');
    const drawer = ref<DrawerRulePropertyType>({
      widget: true,
      property: false,
    });
    provide(DrawerRuleTypeKey, drawer);
    const Graph = ref();
    provide(RuleGraphKey, Graph)
    const history = reactive({
      redo: false,
      undo: false
    })
    provide(RuleGraphHistoryKey, history)
    const data = ref()

    const historyChange = (data: { redo: boolean; undo: boolean; }) => {
      history.redo = data.redo;
      history.undo = data.undo;
    }

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
      // buttonType.value = 'save';
      // confirm('确认', '确认保存当前规则链吗？', { theme: 'info' }).then(({ trigger }) => {
      //   if (trigger === 'confirm') {
      //     router.push('/rulelink');
      //   } else {
      //     buttonType.value = '';
      //   }
      // });
      let json = Graph.value.toJSON();
      console.log(json)
    };

    onMounted(() => {
      addBody(ruleEditorRef);
    })

    return () => {
      return (
        <div ref={ruleEditorRef} class={styles['editor-rule']}>
          <RuleToobar onSave={saveChange} />
          <RuleDrawer />
          <RuleEditorView v-model={Graph.value} data={data.value} onHistory={historyChange} />
        </div>
      );
    };
  }
});

export default RuleEditor;
