import { defineComponent } from 'vue';
import styles from './styles/index.module.scss';

const baseLine = defineComponent({
  setup() {
    return () => {
      return <div class={styles.wrapper}></div>;
    };
  }
});

export default baseLine;
