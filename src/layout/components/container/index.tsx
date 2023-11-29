import { computed, defineComponent } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import styles from './index.module.scss';
import { Content } from 'tdesign-vue-next';
import { useLayoutStore } from '@/store/layout-store';

const LContainer = defineComponent({
  name: 'LContainer',
  setup() {
    const route = useRoute();
    const layoutStore = useLayoutStore();
    const menuDisplay = computed(() => !layoutStore.showMenu);

    const isEditorDashboard = computed(() => {
      return route.path.includes('editor');
    });

    return () => {
      return (
        <Content
          class={[
            styles.layoutContainer,
            menuDisplay.value ? styles.translateLeft150 : '',
            isEditorDashboard.value ? styles.editor : ''
          ]}
        >
          <RouterView />
        </Content>
      );
    };
  }
});

export default LContainer;
