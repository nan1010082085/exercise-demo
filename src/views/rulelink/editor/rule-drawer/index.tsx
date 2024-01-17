import { defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import usePlugin from '@/composables/usePlugin';
import { Collapse, CollapsePanel } from 'tdesign-vue-next';
import type { RuleWidgetModels } from '@/constants/rule-widget.models';

const RuleDrawer = defineComponent({
  name: 'RuleDrawer',
  setup() {
    const drwaer = inject(DrawerRuleTypeKey);
    const ruleConfig = ref<RuleWidgetModels[]>([]);
    const defaultValue = ref([0]);
    const { reserveCreateImage, dragImage } = usePlugin();

    // const onDragStart = (e: DragEvent, manifest: ManifestModels) => {
    //   console.log('drag start', manifest);
    //   e.dataTransfer?.setData('widget', JSON.stringify(manifest));
    //   e.dataTransfer?.setDragImage(dragImage.value, 1, 1);
    // };

    onMounted(() => {
      reserveCreateImage();
    });

    return () => {
      return (
        <div class={[styles['rule-drawer'], drwaer?.value.widget ? styles.visible : '']}>
          <Collapse>
            {ruleConfig.value.map((ruleWidget) => {
              return <CollapsePanel></CollapsePanel>;
            })}
          </Collapse>
        </div>
      );
    };
  }
});

export default RuleDrawer;

export interface RuleDrawerInstance extends InstanceType<typeof RuleDrawer> {}
