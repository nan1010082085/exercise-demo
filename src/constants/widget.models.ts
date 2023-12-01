import type { BaseGeneralModels, MetadataModels } from './base.models';

export const widgetDefualt = {
  id: '',
  name: '测试',
  type: 'base-line',
  general: {
    position: {
      x: 0,
      y: 0,
      width: 300,
      height: 150
    }
  },
  metadata: {},
  manifest: {
    icon: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: '',
    fields: []
  }
};

export interface WidgetConfigOpiton {
  [k: string]: {
    title: string;
    children: string[];
  };
}

export interface FieldModels {
  label: string;
  value: string;
  description: string;
}

export interface ManifestModels {
  id: string;
  name: string;
  type: string;
  icon: string;
  fields: FieldModels[];
}

// 部件数据
export interface WidgetModels {
  id: string;
  name: string;
  type: string;
  general: BaseGeneralModels;
  metadata: MetadataModels;
  manifest: Partial<ManifestModels>;
}
