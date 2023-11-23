// 用户管理
import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { BaseTable, Layout } from 'tdesign-vue-next';
import EPageHeader from '@/components/e-page-header';

const EUserAdmin = defineComponent({
  setup() {
    const userData = ref([]);
    const userColums = ref([]);

    return () => {
      return (
        <div class={styles.wrapper}>
          <EPageHeader title="用户管理"></EPageHeader>
          <Layout>
            <BaseTable rowKey="id" data={userData.value} columns={userColums.value}></BaseTable>
          </Layout>
        </div>
      );
    };
  }
});

export default EUserAdmin;
