import { computed, defineComponent, ref } from 'vue';
import LHeader from './components/header/index';
import LMenu from './components/menus/index';
import LContainer from './components/container/index';
import styles from './styles/index.module.scss';

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => {
      return (
        <t-layout class={styles.wrapper}>
          <LMenu />
          <t-layout>
            <LHeader />
            <LContainer />
          </t-layout>
        </t-layout>
      );
    };
  }
});
