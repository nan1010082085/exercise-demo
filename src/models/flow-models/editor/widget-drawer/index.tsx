import { defineComponent, inject, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { DrawerRuleTypeKey } from '../inject.key';
import usePlugin from '@/composables/usePlugin';
import { Collapse, CollapsePanel, Image as TImage } from 'tdesign-vue-next';
import { categoryConfig } from '@flow-models/widget/lib/config';
import { mainfestInstall } from '@/utils';
import type { ManifestModels } from '@/constants/widget.models';

const RuleDrawer = defineComponent({
  name: 'RuleDrawer',
  setup() {
    const drwaer = inject(DrawerRuleTypeKey);
    const defaultValue = ref([0]);
    const { reserveCreateImage, dragImage } = usePlugin();

    const onDragStart = (e: DragEvent, manifest: ManifestModels) => {
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
            {categoryConfig.map((ruleWidget) => {
              const { children } = ruleWidget;
              return (
                <CollapsePanel key={ruleWidget.label} class={styles['rule-panel']} header={ruleWidget.label}>
                  {children.map((widget) => {
                    const manifest = mainfestInstall(widget, 'flow-models');
                    return (
                      <div
                        key={widget}
                        draggable={true}
                        onDragstart={(e) => onDragStart(e, manifest)}
                        class={styles['rule-card']}
                      >
                        <div class={styles['rule-card-icon']}>
                          <TImage fit={'cover'} src={manifest.icon} />
                        </div>
                        <div class={styles['rule-card-name']}>{manifest.name}</div>
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

export interface RuleDrawerInstance extends InstanceType<typeof RuleDrawer> { }
