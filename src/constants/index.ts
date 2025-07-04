import type { KDashboardParam } from '@board-models/editor/types';
import type { KRuleParam } from '@flow-models/editor/types';

export const languageKeyByLabel = {
  zh_CN: '简体中文',
  // zh_TW: '繁体中文',
  en_US: '英语',
  // ko_KR: '韩语',
  // ja_JP: '日语'
  // ru_RU: '俄语',
  // it_IT: '意大利语',
  // ar_KW: '阿拉伯语'
};

export const languageKeyByValue = {
  简体中文: 'zh_CN',
  // 繁体中文: 'zh_TW',
  英语: 'en_US',
  // 韩语: 'ko_KR',
  // 日语: 'ja_JP'
  // 俄语: 'ru_RU',
  // 意大利语: 'it_IT',
  // 阿拉伯语: 'ar_KW'
};

/**
 * 仪表 & 流程
 * @description 工具栏按钮
 */
export const drawerPropertyTypeValue: Partial<Record<KDashboardParam | KRuleParam, string>> = {
  widget: '部件',
  property: '属性'
};
