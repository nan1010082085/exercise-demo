export interface BaseGeneralModels {
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    z: number;
  };
}

export interface MetadataModels {
  [k: string]: unknown;
}

export interface BaseModel {
  width: number;
  height: number;
}

// menus
export interface MenuExtend {
  meta: {
    title: string;
    icon: string;
  };
}
