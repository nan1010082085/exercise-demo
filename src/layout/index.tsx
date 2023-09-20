import { defineComponent } from 'vue';
import LHeader from './components/header/index';
import LMenu from './components/menus/index';
import LContainer from './components/container/index';
import styles from './styles/index.module.scss';
import { Layout } from 'tdesign-vue-next';

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => {
      return (
        <Layout class={styles.wrapper}>
          <LHeader />
          <Layout>
            <LMenu />
            <LContainer />
          </Layout>
        </Layout>
      );
    };
  }
});
