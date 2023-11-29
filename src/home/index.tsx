import { defineComponent } from 'vue';
import styles from './index.module.scss';
import EPageHeader from '@/components/e-page-header';

const HomeComponent = defineComponent({
  name: 'HomeComponent',
  setup() {
    return () => {
      return (
        <div class={styles.wrapper}>
          <EPageHeader title="首页"></EPageHeader>
        </div>
      );
    };
  }
});

export default HomeComponent;
