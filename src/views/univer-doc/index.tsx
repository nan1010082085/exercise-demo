import { defineComponent, nextTick, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { createUniver, defaultTheme, FUniver, LocaleType, merge } from '@univerjs/presets';
import { type FDocument, UniverDocsCorePreset } from '@univerjs/presets/preset-docs-core';
import docsCoreZhCN from '@univerjs/presets/preset-docs-core/locales/zh-CN';
import { UniverDocsDrawingPreset } from '@univerjs/presets/preset-docs-drawing';
import docsDrawingZhCN from '@univerjs/presets/preset-docs-drawing/locales/zh-CN';
import { UniverDocsHyperLinkPreset } from '@univerjs/presets/preset-docs-hyper-link';
import docsHyperLinkZhCN from '@univerjs/presets/preset-docs-hyper-link/locales/zh-CN';
import { DOCUMENT_DATA } from '../../../public/default-json/data';

import '@univerjs/presets/lib/styles/preset-docs-core.css';
import '@univerjs/presets/lib/styles/preset-docs-drawing.css';
import '@univerjs/presets/lib/styles/preset-docs-hyper-link.css';

const UniverDoc = defineComponent({
  setup() {
    const univerDom = ref<HTMLDivElement>();
    const univerInstance = ref<FDocument>();

    const init: () => Promise<FUniver> = async () => {
      return new Promise((resolve) => {
        const { univerAPI } = createUniver({
          locale: LocaleType.ZH_CN,
          locales: {
            [LocaleType.ZH_CN]: merge({}, docsCoreZhCN, docsDrawingZhCN, docsHyperLinkZhCN)
          },
          theme: defaultTheme,
          presets: [
            UniverDocsCorePreset({
              container: univerDom.value //指定容器渲染
            }),
            UniverDocsDrawingPreset(),
            UniverDocsHyperLinkPreset()
          ]
        });
        resolve(univerAPI);
      });
    };

    onMounted(async () => {
      const funiver = await init();
      univerInstance.value = funiver?.createUniverDoc(DOCUMENT_DATA);
      console.log(univerInstance.value);
    });

    return () => {
      return <div ref={univerDom} class={styles['univerDoc']}></div>;
    };
  }
});

export default UniverDoc;
