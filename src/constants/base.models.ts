export interface BaseGeneralModels {
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MetadataModels {
  [k: string]: unknown;
}

export interface BaseModel {
  width: number;
  height: number;
}
