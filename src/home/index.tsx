import { defineComponent } from 'vue';
import styles from './index.module.scss';

const HomeComponent = defineComponent({
  setup() {
    return () => {
      return <div class={styles.wrapper}></div>
    };
  }
});

export default HomeComponent;
