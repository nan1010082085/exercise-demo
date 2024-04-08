import type { BaseGeneralModels, MetadataModels } from './base';

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
