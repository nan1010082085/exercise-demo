export interface RuleConfigCollapse {
  key: string;
  label: string;
  icon?: string;
  children: string[];
}

export const categoryConfig: RuleConfigCollapse[] = [
  {
    key: 'base',
    label: '基础',
    children: ['base-text', 'base-cricle', 'base-rect']
  }
];
