import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import { BaseTable, Layout } from 'tdesign-vue-next';
import EPageHeader from '@/components/e-page-header';

const EUserRole = defineComponent({
  setup() {
    const roleData = ref([]);
    const roleColums = ref([]);

    return () => {
      return (
        <div class={styles['page-role']}>
          <EPageHeader title="角色管理"></EPageHeader>
          <Layout>
            <BaseTable rowKey="id" data={roleData.value} columns={roleColums.value}></BaseTable>
          </Layout>
        </div>
      );
    };
  }
});

export default EUserRole;
