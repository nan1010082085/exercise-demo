import { languageKeyByLabel, languageKeyByValue } from '@/constants';
import { useLayoutStore } from '@/store/layout-store';
import { Button, Header, Select } from 'tdesign-vue-next';
import { computed, defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { HomeIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';

const LHeader = defineComponent({
  setup() {
    const router = useRouter();

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

    const routePush = (name: string) => {
      router.push({ name });
    };

    return () => {
      return (
        <Header class={styles.wrapper}>
          <div class={styles['h-left']}>header</div>
          <div class={styles['h-right']}>
            <Button variant="text" onClick={() => routePush('home')}>
              {{
                icon: () => <HomeIcon />
              }}
            </Button>
            <Select
              v-model={selValue.value}
              options={languageOptions.value}
              placeholder={'请选择语言'}
              on-change={changeLanguage}
            ></Select>
          </div>
        </Header>
      );
    };
  }
});

export default LHeader;
