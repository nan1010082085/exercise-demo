import type { BaseGeneralModels, MetadataModels } from './base.models';

export const widgetDefualt = {
  id: '',
  name: '测试',
  icon: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
  general: {
    position: {
      x: 0,
      y: 0,
      width: 300,
      height: 150
    }
  },
  metadata: {},
  manifest: []
};

export interface ManifestModels {
  label: string;
  type: string;
  description: string;
}

// 部件数据
export interface WidgetModels {
  id: string;
  name: string;
  icon: string;
  general: BaseGeneralModels;
  metadata: MetadataModels;
  manifest: Partial<ManifestModels[]>;
}
