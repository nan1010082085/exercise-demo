import type { languageKeyByLabel } from '@/constants';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export type LanguageT = keyof typeof languageKeyByLabel;

const useLayoutStore = defineStore('layout', () => {
  const zh = ref<LanguageT>('zh_CN');

  const changeLanguage = (language: LanguageT) => {
    zh.value = language;
  };

  return {
    zh,
    changeLanguage
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}

export { useLayoutStore };
