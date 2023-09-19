import { computed, defineComponent, onMounted, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useGlobalStore } from './store/global-store';
import { merge } from 'lodash-es';
import { useLayoutStore } from './store/layout-store';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';
import enUs from 'tdesign-vue-next/es/locale/en_US';
import { ConfigProvider } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const { globalConfig } = useGlobalStore();
    const layoutStore = useLayoutStore();

    const config = computed(() => {
      let languageDef = {};
      switch (layoutStore.zh) {
        case 'zh_CN':
          languageDef = zhCn;
          break;
        case 'en_US':
          languageDef = enUs;
          break;
        default:
          languageDef = zhCn;
      }
      return merge(languageDef, globalConfig);
    });

    return () => {
      return (
        <ConfigProvider globalConfig={config.value}>
          <RouterView />
        </ConfigProvider>
      );
    };
  }
});
