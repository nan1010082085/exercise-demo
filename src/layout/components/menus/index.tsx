import { computed, defineComponent } from 'vue';
import styles from './index.module.scss';
import { Aside, Header, Layout, Menu, MenuItem } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';

const LMenu = defineComponent({
  setup() {
    const layoutStore = useLayoutStore();
    const visible = computed(() => layoutStore.showMenu);

    const menuItemRender = computed(() => {
      return <MenuItem></MenuItem>;
    });

    return () => {
      return (
        <Aside class={[styles.layoutMenus, visible.value ? styles.visible : '']}>{/* <Menu>{menuItemRender}</Menu> */}</Aside>
      );
    };
  }
});

export default LMenu;
