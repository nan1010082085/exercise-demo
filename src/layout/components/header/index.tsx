import { languageKeyByLabel, languageKeyByValue } from '@/constants';
import { useLayoutStore, type LanguageT } from '@/store/layout-store';
import { Button, Dropdown, Header, Space, Tooltip, type TdDropdownItemProps } from 'tdesign-vue-next';
import { ControlPlatformIcon, HomeIcon, MenuFoldIcon, MenuUnfoldIcon, TranslateIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent } from 'vue';
import styles from './index.module.scss';
import { useRouter } from 'vue-router';
import UserLogo from './components/user-logo';
import EBreadcrumb from '@/components/e-breadcrumb';

type DropdownOption = Pick<TdDropdownItemProps, 'content'> & { value: LanguageT };

const LHeader = defineComponent({
  name: 'LHeader',
  setup() {
    const router = useRouter();

    const layoutStore = useLayoutStore();
    const { changeLanguage, visibleMenu } = layoutStore;
    const selValue = computed(() => languageKeyByLabel[layoutStore.zh]);
    const menuDisplay = computed(() => layoutStore.showMenu);

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
      router.replace({ name: pathName });
    };

    return () => {
      return (
        <Header class={styles.wrapper}>
          <div class={styles['h-left']}>
            <div class={styles.logo}>
              <h1>Exercise Demo</h1>
            </div>
            <Button
              variant="text"
              icon={() => (menuDisplay.value ? <MenuFoldIcon /> : <MenuUnfoldIcon />)}
              onClick={visibleMenu}
            />
          </div>
          <div class={[styles['h-center'], 'scrollbar']}><EBreadcrumb /></div>
          <div class={styles['h-right']}>
            <Space direction={'horizontal'}>
              <Tooltip content={'返回 Home'}>
                <Button
                  theme="primary"
                  shape="circle"
                  variant="text"
                  icon={() => <HomeIcon />}
                  onClick={() => routerPush('Home')}
                />
              </Tooltip>
              <Tooltip content={'测试验证'}>
                <Button
                  theme="primary"
                  shape="circle"
                  variant="text"
                  icon={() => <ControlPlatformIcon />}
                  onClick={() => routerPush('TestV')}
                />
              </Tooltip>
              <Dropdown
                options={languageOptions.value}
                trigger="click"
                on-click={(e: DropdownOption) => changeLanguage(e.value)}
              >
                <Button variant="text" icon={() => <TranslateIcon />}>
                  {selValue.value}
                </Button>
              </Dropdown>
              <UserLogo />
            </Space>
          </div>
        </Header>
      );
    };
  }
});

export default LHeader;
