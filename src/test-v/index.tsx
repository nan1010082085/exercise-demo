import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import styles from './index.module.scss';
import {
  Aside,
  Button,
  Content,
  Header,
  Layout,
  Menu,
  Submenu,
  MenuItem,
  Space,
  type MenuRoute
} from 'tdesign-vue-next';
import { creategoryRoutes, textViewRoutes } from '@/router/path/text-view';
import { RollbackIcon } from 'tdesign-icons-vue-next';
import { useGlobalStore } from '@/store/global-store';
import { TestV } from '@/constants/test-v.models';

const TextViews = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const subActive = ref<string[]>([]);
    const active = ref('');
    const { clearBreadcrumbHistory } = useGlobalStore();

    onMounted(() => {
      const { path, name } = route;
      const sub = path.match(/[a-z]+-components+/g);
      if (sub) {
        subActive.value = sub[0] ? [sub[0]] : [];
        active.value = `${sub[0]}-${(name as string) || ''}`;
      }
    });

    const subTitle = (key: string) => {
      const sub = key.split('-')[0];
      return TestV[sub] || sub;
    };

    const subMenus = computed(() => {
      return creategoryRoutes.map((sub) => {
        return (
          <Submenu key={sub} value={sub} title={subTitle(sub)}>
            {textViewRoutes
              .filter((text) => text.creategory === sub)
              .map((text) => {
                const { name, path } = text;
                return (
                  <MenuItem key={path} to={`${path}` as MenuRoute}>
                    {name}
                  </MenuItem>
                );
              })}
          </Submenu>
        );
      });
    });

    const back = () => {
      clearBreadcrumbHistory();
      router.push('/home');
    };

    return () => {
      return (
        <Layout class={styles.container}>
          <Header class={styles.header}>
            <Space direction="horizontal" align="center">
              <Button theme="default" icon={() => <RollbackIcon />} onClick={back}></Button>
              <span>测试验证</span>
            </Space>
          </Header>
          <Layout>
            <Aside class={styles.aside}>
              <Menu v-model:expanded={[subActive.value]} value={active.value}>
                {subMenus.value}
              </Menu>
            </Aside>
            <Content class={styles.content}>
              <RouterView />
            </Content>
          </Layout>
        </Layout>
      );
    };
  }
});

export default TextViews;
