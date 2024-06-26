import { defineComponent } from 'vue';
import styles from './index.module.scss'

export default defineComponent({
  name: 'Base-Rect',
  setup: () => {
    return () => <div class={styles.wrapper}></div>
  }
})
