import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { createUniver, defaultTheme, FUniver, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

const UniverSheet = defineComponent({
  setup() {
    const univerInstance = ref<FUniver>();

    const init = async () => {
      return new Promise((resolve) => {
        const { univerAPI } = createUniver({
          locale: LocaleType.ZH_CN,
          locales: {
            [LocaleType.ZH_CN]: merge({}, UniverPresetSheetsCoreZhCN)
          },
          theme: defaultTheme,
          presets: [
            UniverSheetsCorePreset({
              container: 'univer-sheet' //指定容器渲染
            })
          ]
        });
        univerInstance.value = univerAPI;
        resolve(univerInstance.value);
      });
    };

    onMounted(async () => {
      await init();
      univerInstance.value?.createWorkbook({ name: 'sheet' });
    });

    return () => {
      return <div id="univer-sheet" class={styles['univerSheet']}></div>;
    };
  }
});

export default UniverSheet;
