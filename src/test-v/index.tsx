import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import styles from './index.module.scss';
import { Aside, Button, Content, Header, Layout, Menu, MenuItem } from 'tdesign-vue-next';
import { TextViewRoutes } from '@/router/path/text-view';
import { RollbackIcon } from 'tdesign-icons-vue-next';

const TextViews = defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const active = ref('');

    onMounted(() => {
      active.value = route.path;
    });

    const routeAside = computed(() => {
      return TextViewRoutes.map((item) => {
        const { name, path } = item;
        return <MenuItem value={path}>{name}</MenuItem>;
      });
    });

    const back = () => {
      router.push('/person-work')
    }

    const menuChange = () => {
      router.push(active.value);
    };

    return () => {
      return (
        <Layout class={styles.container}>
          <Header class={styles.header}>
            <Button icon={() => <RollbackIcon />} onClick={back}></Button>
          </Header>
          <Layout>
            <Aside class={styles.aside}>
              <Menu v-model={active.value} onChange={menuChange}>
                {routeAside.value}
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
