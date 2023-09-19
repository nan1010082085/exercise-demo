import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Aside } from 'tdesign-vue-next';

const LMenu = defineComponent({
  setup() {
    return () => {
      return <Aside class={styles.layoutMenus}>menu</Aside>;
    };
  }
});

export default LMenu;
