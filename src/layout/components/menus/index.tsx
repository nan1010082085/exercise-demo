import { computed, defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { Aside, Header, Icon, Layout, Menu, MenuItem, Submenu, type MenuRoute } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';
import { MenuData, type EMenu } from '@/constants/menus-view';
import { useRoute } from 'vue-router';

const LMenu = defineComponent({
  name: 'LMenu',
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
                icon: () => (item.meta.icon ? <Icon name={item.meta.icon} /> : null),
                title: () => <span>{item.name}</span>,
                content: () => createChildMenu(item.children)
              }}
            </Submenu>
          );
        }
        return createMenuItem(item);
      });
    });

    // 二级导航展开
    const expanded = ref([route.path.match(/^\/[a-z]*/i)?.[0]]);

    const createMenuItem = (item: EMenu) => {
      return (
        <MenuItem key={item.path} to={item.path as MenuRoute} value={item.path}>
          {{
            icon: () => (item.meta.icon ? <Icon name={item.meta.icon} /> : null),
            default: () => item.name
          }}
        </MenuItem>
      );
    };

    const createChildMenu = (children: EMenu[] = []) => {
      return children.map((i) => {
        return (
          <MenuItem key={i.path} to={i.path as MenuRoute} value={i.path}>
            {{
              icon: () => (i.meta.icon ? <Icon name={i.meta.icon} /> : null),
              default: () => i.name
            }}
          </MenuItem>
        );
      });
    };

    return () => {
      // visible.value ? styles.visible : ''
      // theme="dark"
      return (
        <Aside class={[styles.layoutMenus, styles.visible, !visible.value ? styles.miniWidth : '']}>
          <Menu width={300} value={route.path} v-model:expanded={expanded.value} collapsed={!visible.value}>
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
