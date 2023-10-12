import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import styles from './index.module.scss';
import { Aside, Button, Content, Header, Layout, Menu, Submenu, MenuItem, Space } from 'tdesign-vue-next';
import { creategoryRoutes, textViewRoutes } from '@/router/path/text-view';
import { RollbackIcon } from 'tdesign-icons-vue-next';

const TextViews = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const subActive = ref('');
    const active = ref('');

    onMounted(() => {
      const { path, name } = route;
      const sub = path.match(/[a-z]+-components+/g);
      if (sub) {
        subActive.value = sub[0] || '';
        active.value = `${sub[0]}-${(name as string) || ''}`;
      }
    });

    const subMenus = computed(() => {
      return creategoryRoutes.map((sub) => {
        return (
          <Submenu value={sub} title={sub}>
            {textViewRoutes
              .filter((text) => text.creategory === sub)
              .map((text) => {
                const { name, path } = text;
                return <MenuItem value={`${sub}-${name}`}>{name}</MenuItem>;
              })}
          </Submenu>
        );
      });
    });

    const back = () => {
      router.push('/person-work');
    };

    const menuChange = () => {
      router.push(active.value);
    };

    return () => {
      return (
        <Layout class={styles.container}>
          <Header class={styles.header}>
            <Space direction="horizontal" align="center">
              <Button theme="default" icon={() => <RollbackIcon />} onClick={back}></Button>
              <span>Vue 基础验证</span>
            </Space>
          </Header>
          <Layout>
            <Aside class={styles.aside}>
              <Menu v-model:expanded={subActive.value} value={active.value} onChange={menuChange}>
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
