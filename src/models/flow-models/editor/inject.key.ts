import type { InjectionKey, Ref } from "vue";
import type { DrawerRulePropertyType } from "./types";

export const DrawerRuleTypeKey = Symbol('drawerRule') as InjectionKey<Ref<DrawerRulePropertyType>>;
export const RuleGraphKey = Symbol('ruleGraph') as InjectionKey<Ref<any>>;
export const RuleGraphHistoryKey = Symbol('ruleGraphHistory') as InjectionKey<{ undo : boolean; redo: boolean}>;
