import { defineStore } from 'pinia';
import { ref, toValue, type Ref, toRef } from 'vue';

const ruleStore = defineStore('rule', () => {
  const body = ref();

  const addBody = (el: Ref<HTMLDivElement | undefined>) => {
    body.value = toValue(el);
  };

  return {
    body,
    addBody
  };
});

export default ruleStore;
