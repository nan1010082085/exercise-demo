import EPageHeader from '@/components/e-page-header';
import { defineComponent } from 'vue';
import styles from './styles/index.module.scss';
import { Button } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

const Widget = defineComponent({
  setup() {
    const router = useRouter();

    const craeteDashboard = (row: any) => {
      console.log('create dashboard');
      let query = {};
      // if (row) {
      // }
      router.push({ path: '/editor', query });
    };

    return () => {
      return (
        <div class={styles.widget}>
          <EPageHeader title="部件列表">
            <Button onClick={craeteDashboard}>创建仪表板</Button>
          </EPageHeader>
          <div class={styles.container}>
            <div class={styles.footer}></div>
          </div>
        </div>
      );
    };
  }
});

export default Widget;
