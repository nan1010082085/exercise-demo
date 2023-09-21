import { defineComponent } from 'vue';
import styles from './index.module.scss';

const Door = defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.wrapper}>
          <div class={styles.cricle}></div>
        </div>
      );
    };
  }
});

export default Door;
