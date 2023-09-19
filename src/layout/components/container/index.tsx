import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import styles from './index.module.scss'

const LContainer = defineComponent({
  setup() {
    return () => {
      return (
        <t-content class={styles.layoutContainer}>
          <RouterView />
        </t-content>
      );
    };
  }
});

export default LContainer;
