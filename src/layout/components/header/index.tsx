import { languageKeyByLabel, languageKeyByValue } from '@/constants';
import { useLayoutStore, type LanguageT } from '@/store/layout-store';
import { Button, Divider, Dropdown, Header, Popup, Space, type TdDropdownItemProps } from 'tdesign-vue-next';
import { computed, defineComponent } from 'vue';
import styles from './index.module.scss';
import { Call1Icon, HomeIcon, LogoQqIcon, LogoWechatIcon, TranslateIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';

type DropdownOption = Pick<TdDropdownItemProps, 'content'> & { value: LanguageT };

const LHeader = defineComponent({
  setup() {
    const router = useRouter();

    const layoutStore = useLayoutStore();
    const { changeLanguage } = layoutStore;
    const selValue = computed(() => languageKeyByLabel[layoutStore.zh]);

    // Dropdown
    const languageOptions = computed(() => {
      return Reflect.ownKeys(languageKeyByValue).map((item) => {
        return {
          content: item as string,
          value: Reflect.get(languageKeyByValue, item)
        } as DropdownOption;
      });
    });

    const routerPush = (pathName: string) => {
      router.push({ name: pathName });
    };

    return () => {
      return (
        <Header class={styles.wrapper}>
          <div class={styles['h-left']}>
            <Button variant="text" icon={() => <HomeIcon />} onClick={() => routerPush('Home')} />
          </div>
          <div class={styles['h-right']}>
            <Space>
              <Dropdown options={languageOptions.value} on-click={(e: DropdownOption) => changeLanguage(e.value)}>
                <Space>
                  <Button variant="text" icon={() => <TranslateIcon />}>
                    {selValue.value}
                  </Button>
                </Space>
              </Dropdown>
              <Popup overlayClassName={styles.popupContent}>
                {{
                  default: () => (
                    <div class={styles.userLogo}>
                      <img src="/image/user.jpg" alt="" />
                    </div>
                  ),
                  content: () => (
                    <>
                      <Button shape="circle" icon={() => <LogoWechatIcon />} />
                      <Button variant="text">nam1010082085</Button>
                      <Divider />
                      <Button shape="circle" icon={() => <LogoQqIcon />} />
                      <Button variant="text">1010082085</Button>
                      <Divider />
                      <Button shape="circle" icon={() => <Call1Icon />} />
                      <Button variant="text">15117960621</Button>
                      <Divider />
                    </>
                  )
                }}
              </Popup>
            </Space>
          </div>
        </Header>
      );
    };
  }
});

export default LHeader;
