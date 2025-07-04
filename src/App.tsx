import { computed, defineComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';
// import { useGlobalStore } from './store/global-store';
// import { merge } from 'lodash-es';
import { useLayoutStore } from './store/layout-store';
import zhCn from 'tdesign-vue-next/es/locale/zh_CN';
import enUs from 'tdesign-vue-next/es/locale/en_US';
// import zhTW from 'tdesign-vue-next/es/locale/zh_TW';
// import koKR from 'tdesign-vue-next/es/locale/ko_KR';
// import jaJP from 'tdesign-vue-next/es/locale/ja_JP';
// import arKW from 'tdesign-vue-next/es/locale/ar_KW';
import { ConfigProvider } from 'tdesign-vue-next';
import { initUserAdmin, initRoleAdmin } from './utils/iniIndexedDB';

export default defineComponent({
  name: 'App',
  setup() {
    // const { globalConfig } = useGlobalStore();
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
        // case 'ko_KR':
        //   languageDef = koKR;
        //   break;
        // case 'ja_JP':
        //   languageDef = jaJP;
        //   break;
        // case 'ar_KW':
        //   languageDef = arKW;
        //   break;
        default:
          languageDef = zhCn;
      }
      // return merge(languageDef, globalConfig);
      return languageDef;
    });

    // const workerMessage = (e: MessageEvent) => {
    //   console.log('worker.message', e.data);
    // };
    // const workerError = (e: ErrorEvent) => {
    //   console.log('worker.error', e);
    // };

    onMounted(() => {
      initUserAdmin();
      initRoleAdmin();

      // 注册一个 service.worker
      // const url = new URL('@workers/test-service-worker.js', import.meta.url).href
      // if ("serviceWorker" in navigator) {
      //   const serviceWorker = navigator.serviceWorker.register(url);
      //   console.log(serviceWorker)

      //   serviceWorker.then((registration: ServiceWorkerRegistration) => {
      //     console.log('serviceWorker registration', registration);
      //     console.log()

      //     registration.active?.postMessage(
      //       "Test message sent immediately after creation",
      //     );

      //   });
      // }

      // -------------------------
      // const url = new URL('@workers/test-worker.js', import.meta.url);
      // const worker = new Worker(url);
      // // 监听worker消息
      // worker.onmessage = workerMessage;
      // worker.onerror = workerError;
      // // 测试向线程中发送消息
      // worker.postMessage({type: 'app', data: 'hello world'});
      // // 结束worker调用
      // const stop = () => {
      //   console.log('提前结束worker调用');
      //   worker.terminate();
      // };
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
