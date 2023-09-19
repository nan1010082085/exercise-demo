import { computed, defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useLayoutStore, type LanguageT } from '@/store/layout-store';
import { languageKeyByLabel, languageKeyByValue } from '@/constants';

export default defineComponent({
  name: 'Layout',
  setup() {
    const { zh, changeLanguage } = useLayoutStore();

    const selValue = ref(languageKeyByLabel[zh]);

    const languageOptions = computed(() => {
      return Reflect.ownKeys(languageKeyByValue).map((item) => {
        return {
          label: item,
          value: Reflect.get(languageKeyByValue, item)
        };
      });
    });

    return () => {
      return (
        <t-layout>
          {/* <t-select
            v-model={selValue.value}
            options={languageOptions.value}
            pagination={'请选择语言'}
            onChange={changeLanguage}
          ></t-select> */}
          <t-button>按钮</t-button>
          <t-pagination></t-pagination>
          <RouterView />
        </t-layout>
      );
    };
  }
});
