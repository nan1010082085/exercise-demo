import type { languageKeyByLabel } from '@/constants';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export type LanguageT = keyof typeof languageKeyByLabel;

const useLayoutStore = defineStore('layout', () => {
  // 语言
  const zh = ref<LanguageT>('zh_CN');
  const changeLanguage = (language: LanguageT) => {
    zh.value = language;
  };

  // 显示侧边导航
  const showMenu = ref<boolean>(true);
  const visibleMenu = () => {
    showMenu.value = !showMenu.value;
  };

  return {
    zh,
    changeLanguage,
    showMenu,
    visibleMenu
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}

export { useLayoutStore };
