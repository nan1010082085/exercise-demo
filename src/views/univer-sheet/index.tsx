import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import styles from './index.module.scss';

import {
  createUniver,
  defaultTheme,
  type FUniver,
  LocaleType,
  merge,
  type Univer,
  type IWorkbookData
} from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

const UniverSheet = defineComponent({
  setup() {
    let univerInstance: Univer | null = null;
    let univerAPIInstance: FUniver | null = null;

    onMounted(() => {
      const { univer, univerAPI } = createUniver({
        locale: LocaleType.ZH_CN,
        locales: {
          [LocaleType.ZH_CN]: merge({}, UniverPresetSheetsCoreZhCN)
        },
        theme: defaultTheme,
        presets: [
          UniverSheetsCorePreset({
            container: 'univer-sheet' // container.value as HTMLElement
          })
        ]
      });

      const data: IWorkbookData = {
        id: 'test',
        sheets: {
          sheet1: {
            id: 'sheet1',
            name: 'sheet1',
            cellData: {
              0: {
                0: {
                  v: 'Hello Univer!'
                }
              }
            },
            rowCount: 50,
            columnCount: 50
          }
        },
        locale: LocaleType.ZH_CN,
        name: 'Test Workbook',
        sheetOrder: ['sheet1']
      };

      univerAPI.createWorkbook(data);
      univerInstance = univer;
      univerAPIInstance = univerAPI;
    });

    onBeforeUnmount(() => {
      univerInstance?.dispose();
      univerAPIInstance?.dispose();
      univerInstance = null;
      univerAPIInstance = null;
    });

    return () => {
      return <div id="univer-sheet" class={[styles['univerSheet'], 'p-10px']}></div>;
    };
  }
});

export default UniverSheet;
