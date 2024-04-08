import { defineComponent, inject, watchPostEffect } from 'vue';
import styles from './index.module.scss'
import { Node } from '@antv/x6'

export default defineComponent({
  name: 'Base-Cricle',
  setup: () => {
    // const node: (() => Node<Node.Properties> | undefined) | undefined = inject('getNode');

    // watchPostEffect(() => {
    //   if (node) {
    //     const { data } = node()!;
    //   }
    // })

    return () => <div class={styles.wrapper}></div>
  }
})
