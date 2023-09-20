import { computed, defineComponent } from 'vue';
import styles from './index.module.scss';
import { Aside, Header, Layout, Menu, MenuItem } from 'tdesign-vue-next';

const LMenu = defineComponent({
  setup() {
    const menuItemRender = computed(() => {
      return <MenuItem></MenuItem>;
    });

    return () => {
      return (
        <Aside class={styles.layoutMenus}>
          <Header class={styles.menuLogo}>
            <h1>Exercise Demo</h1>
          </Header>
          <Menu>{menuItemRender}</Menu>
        </Aside>
      );
    };
  }
});

export default LMenu;
