import { defineComponent, inject, ref, watchPostEffect } from "vue";
import styles from './styles/index.module.scss';
import { Node } from '@antv/x6'

export default defineComponent({
  name: 'Text',
  setup(_) {
    const node: (() => Node<Node.Properties> | undefined) | undefined = inject('getNode');
    const text = ref('');

    watchPostEffect(() => {
      if (node) {
        const { data } = node()!;
        text.value = data.text ?? '';
      }
    })

    return () => {
      return <div class={styles.baseRuleText}>{text.value}</div>
    }
  }
})
