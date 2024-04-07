import { computed, defineComponent } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import styles from './index.module.scss';
import { Content } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';

const urlNames = ['board-editor', 'flow-editor'];

const LContainer = defineComponent({
  name: 'LContainer',
  setup() {
    const route = useRoute();
    const layoutStore = useLayoutStore();
    const menuDisplay = computed(() => !layoutStore.showMenu);

    const isEditorDashboard = computed(() => urlNames.some((k) => route.path.includes(k)));

    return () => {
      return (
        <Content
          class={[
            styles.layoutContainer,
            menuDisplay.value ? styles.translateLeft150 : '',
            isEditorDashboard.value ? styles.editor : styles.list
          ]}
        >
          <RouterView />
        </Content>
      );
    };
  }
});

export default LContainer;
