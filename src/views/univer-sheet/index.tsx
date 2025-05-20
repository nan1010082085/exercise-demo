import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { createUniver, defaultTheme, FUniver, LocaleType, merge } from '@univerjs/presets';
import { type FWorkbook, UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

const UniverSheet = defineComponent({
  setup() {
    const univerInstance = ref<FWorkbook>();

    const init: () => Promise<FUniver> = async () => {
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
        resolve(univerAPI);
      });
    };

    onMounted(async () => {
      const funiver = await init();
      univerInstance.value = funiver?.createWorkbook({ name: 'sheet' });
      console.log(univerInstance.value);
    });

    return () => {
      return <div id="univer-sheet" class={[styles['univerSheet'], 'p-10px']}></div>;
    };
  }
});

export default UniverSheet;
