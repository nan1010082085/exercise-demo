import { computed, defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { useGlobalStore } from './store/global-store';
import { merge } from 'lodash-es';
import { useLayoutStore } from './store/layout-store';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';
import enUs from 'tdesign-vue-next/es/locale/en_US';
// import zhTW from 'tdesign-vue-next/es/locale/zh_TW';
import koKR from 'tdesign-vue-next/es/locale/ko_KR';
import jaJP from 'tdesign-vue-next/es/locale/ja_JP';
// import arKW from 'tdesign-vue-next/es/locale/ar_KW';
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
        // case 'zh_TW':
        //   languageDef = zhTW;
        //   break;
        case 'ko_KR':
          languageDef = koKR;
          break;
        case 'ja_JP':
          languageDef = jaJP;
          break;
        // case 'ar_KW':
        //   languageDef = arKW;
        //   break;
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
