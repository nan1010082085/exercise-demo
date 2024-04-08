/**
 * @Author Yang (yang dong nan)
 * @Date 2023-12-01 13:51:58
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-12-01 13:51:58
 * @Description 部件分组配置
 */

import type { WidgetConfigOpiton } from '@/@types/widget';

const widgetConfig: WidgetConfigOpiton = {
  base: {
    title: '基础图表',
    children: []
  },
  line: {
    title: '折线图',
    children: ['base-line']
  },
  bar: {
    title: '柱图',
    children: ['base-bar']
  },
  pie: {
    title: '饼图',
    children: ['base-pie']
  }
};

export default widgetConfig;
