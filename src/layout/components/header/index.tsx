import { languageKeyByLabel, languageKeyByValue } from '@/constants';
import { useLayoutStore } from '@/store/layout-store';
import { Header } from 'tdesign-vue-next';
import { computed, defineComponent, ref } from 'vue';
import styles from './index.module.scss';

const LHeader = defineComponent({
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
        <Header class={styles.wrapper}>
          <div class={styles['h-left']}>header</div>
          <div class={styles['h-right']}>
            <t-select
              v-model={selValue.value}
              options={languageOptions.value}
              pagination={'请选择语言'}
              onChange={changeLanguage}
            ></t-select>
          </div>
        </Header>
      );
    };
  }
});

export default LHeader;
