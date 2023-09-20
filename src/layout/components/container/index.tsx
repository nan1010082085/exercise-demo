import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import styles from './index.module.scss'
import { Content } from 'tdesign-vue-next';

const LContainer = defineComponent({
  setup() {
    return () => {
      return (
        <Content class={[styles.layoutContainer]}>
          <RouterView />
        </Content>
      );
    };
  }
});

export default LContainer;
