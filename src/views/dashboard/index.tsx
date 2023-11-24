import { defineComponent, ref } from 'vue';
import EPageHeader from '@/components/e-page-header';
import styles from './index.module.scss';

const Dashboard = defineComponent({
  setup() {

    return () => {
      return (
        <div class={styles['dashboard-wrapper']}>
          <EPageHeader title="仪表板"></EPageHeader>
          <div>
          </div>
        </div>
      );
    };
  }
});

export default Dashboard;
