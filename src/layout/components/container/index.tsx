import { computed, defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import styles from './index.module.scss';
import { Content } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';

const LContainer = defineComponent({
  setup() {
    const layoutStore = useLayoutStore();
    const menuDisplay = computed(() => !layoutStore.showMenu);

    return () => {
      console.log(menuDisplay.value)
      return (
        <Content class={[styles.layoutContainer, menuDisplay.value ? styles.translateLeft150 : '']}>
          <RouterView />
        </Content>
      );
    };
  }
});

export default LContainer;
