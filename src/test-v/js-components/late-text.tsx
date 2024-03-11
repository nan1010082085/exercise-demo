import { defineComponent } from 'vue';
import styles from './late-text.module.scss';

const LateTextComponent = defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.lateText}>
          <p class={styles.text}>Text, Late Text</p>
        </div>
      );
    };
  }
});

export default LateTextComponent;
