import type { InjectionKey, Ref } from "vue";
import type { DrawerRulePropertyType } from "./types";

export const DrawerRuleTypeKey = Symbol('drawerRule') as InjectionKey<Ref<DrawerRulePropertyType>>;
