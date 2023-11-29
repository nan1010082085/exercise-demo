import type { InjectionKey, Ref } from "vue";
import type { DrawerPropertyType } from "./types";

export const DrawerTypeKey = Symbol('drawer') as InjectionKey<Ref<DrawerPropertyType>>;
