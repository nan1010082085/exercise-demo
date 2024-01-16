export interface DrawerRulePropertyType {
  widget: boolean;
}

/**
 * 节点
 */
export interface ElementsNode {
  id: string;
  type?: string;
  label: string;
  position: {
    x: number;
    y: number;
  };
  class: string;
}

/**
 * 线
 */
export interface ElementsEdge {
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
export type ElementsRefType = ElementsNode | ElementsNode;
