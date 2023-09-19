import { defineComponent } from 'vue';
import styles from './index.module.scss';

const LMenu = defineComponent({
  setup() {
    return () => {
      return <t-aside class={styles.layoutMenus}>menu</t-aside>;
    };
  }
});

export default LMenu;
