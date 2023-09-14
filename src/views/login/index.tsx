import { defineComponent } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    return () => {
      return <div class={styles.wrapper}>
        <div class={styles.formWrapper}></div>
      </div>;
    };
  }
});
