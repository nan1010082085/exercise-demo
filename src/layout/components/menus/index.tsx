import { computed, defineComponent } from 'vue';
import styles from './index.module.scss';
import { Aside, Header, Layout, Menu, MenuItem, Submenu } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';
import { MenuData, type EMenu } from '@/constants/menus-view';
import { useRoute } from 'vue-router';

const LMenu = defineComponent({
  setup() {
    const route = useRoute();
    const layoutStore = useLayoutStore();
    const visible = computed(() => layoutStore.showMenu);

    const menuItemRender = computed(() => {
      return MenuData.map((item) => {
        if (item.children?.length) {
          return (
            <Submenu key={item.path} value={item.path}>
              {{
                title: () => <span>{item.name}</span>,
                content: () => createChildMenu(item.children, item.path)
              }}
            </Submenu>
          );
        }
        return createMenuItem(item);
      });
    });

    const createMenuItem = (item: EMenu) => {
      return (
        <MenuItem key={item.path} to={item.path} value={item.path}>
          {item.name}
        </MenuItem>
      );
    };

    const createChildMenu = (children: EMenu[] = [], prefix = '') => {
      return children.map((i) => (
        <MenuItem key={i.path} to={i.path} value={prefix + i.path}>
          {i.name}
        </MenuItem>
      ));
    };

    return () => {
      console.log(route.path);
      return (
        <Aside class={[styles.layoutMenus, visible.value ? styles.visible : '']}>
          <Menu width={300} value={route.path}>
            {{
              default: () => menuItemRender.value
            }}
          </Menu>
        </Aside>
      );
    };
  }
});

export default LMenu;
