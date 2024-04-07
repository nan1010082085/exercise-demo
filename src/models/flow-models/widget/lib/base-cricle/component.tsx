import { defineComponent } from 'vue';
import styles from './index.module.scss'

export default defineComponent({
  name: 'Base-Cricle',
  setup: () => {
    return () => <div class={styles.wrapper}></div>
  }
})
