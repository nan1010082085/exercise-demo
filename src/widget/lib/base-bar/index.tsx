import { defineComponent } from 'vue';
import styles from './styles/index.module.scss';

const baseBar = defineComponent({
  setup() {
    return () => {
      return <div class={styles.wrapper}></div>;
    };
  }
});

export default baseBar;
