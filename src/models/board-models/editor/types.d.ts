
export interface DrawerPropertyType {
  widget: boolean;
  ruler: boolean;
  auxiliary: boolean
}

export type KDashboardParam = keyof DrawerPropertyType;
