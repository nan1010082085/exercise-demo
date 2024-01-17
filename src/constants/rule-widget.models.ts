import type { BaseGeneralModels, MetadataModels } from './base.models';

export const ruleWidgetDefault = {
  id: '',
  label: '测试节点',
  position: {
    x: 0,
    y: 0
  },
  metadata: {}
};

interface Common {
  metadata: MetadataModels;
}

/**
 * 节点
 */
export interface ElementsNode extends Common {
  id: string;
  label: string;
  type?: 'input' | 'otput' | string;
  position: {
    x: number;
    y: number;
  };
  class: string;
}

/**
 * 线
 */
export interface ElementsEdge extends Common {
  id: string;
  type: string;
  label: string;
  source: ElementsNode['id'];
  target: ElementsNode['id'];
  style: Record<string, any>;
  labelBgStyle: { fill: string };
  markerEnd: string;
  animated: boolean;
}

/**
 * 集合
 */
export type RuleWidgetModels = ElementsNode | ElementsNode;
