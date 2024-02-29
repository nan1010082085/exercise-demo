import { defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import usePlugin from '@/composables/usePlugin';
import { Collapse, CollapsePanel, Image as TImage } from 'tdesign-vue-next';
import type { RuleWidgetModels } from '@/constants/rule-widget.models';
import { useVueFlow } from '@vue-flow/core';

interface RuleConfigCollapse {
  title: string;
  children: RuleWidgetModels[];
}

const TImageIcon = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

const RuleDrawer = defineComponent({
  name: 'RuleDrawer',
  setup() {
    const drwaer = inject(DrawerRuleTypeKey);
    const ruleConfig = ref<RuleConfigCollapse[]>([
      {
        title: '基础',
        children: [
          { label: 'start', type: 'input', icon: TImageIcon, metadata: {} },
          { label: 'end', type: 'output', icon: TImageIcon, metadata: {} },
          { label: 'default', icon: TImageIcon, metadata: {} }
        ]
      }
    ]);
    const defaultValue = ref([0]);
    const { reserveCreateImage, dragImage } = usePlugin();

    const onDragStart = (e: DragEvent, manifest: RuleWidgetModels) => {
      console.log('drag start', manifest);
      e.dataTransfer?.setData('widget', JSON.stringify(manifest));
      e.dataTransfer?.setDragImage(dragImage.value, 1, 1);
    };

    onMounted(() => {
      reserveCreateImage();
    });

    return () => {
      return (
        <div class={[styles['rule-drawer'], drwaer?.value.widget ? styles.visible : '']}>
          <Collapse defaultValue={defaultValue.value}>
            {ruleConfig.value.map((ruleWidget) => {
              const { children } = ruleWidget;
              return (
                <CollapsePanel key={ruleWidget.title} class={styles['rule-panel']} header={ruleWidget.title}>
                  {children &&
                    children.map((widget) => {
                      return (
                        <div
                          key={widget.label}
                          draggable={true}
                          onDragstart={(e) => onDragStart(e, widget)}
                          class={styles['rule-card']}
                        >
                          <div class={styles['rule-card-icon']}>
                            <TImage fit={'cover'} src={widget.icon} />
                          </div>
                          <div class={styles['rule-card-name']}>{widget.label}</div>
                        </div>
                      );
                    })}
                </CollapsePanel>
              );
            })}
          </Collapse>
        </div>
      );
    };
  }
});

export default RuleDrawer;

export interface RuleDrawerInstance extends InstanceType<typeof RuleDrawer> {}
