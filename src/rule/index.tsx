import { defineComponent, reactive } from 'vue';
import styles from './styles/index.module.scss';
import EPageHeader from '@/components/e-page-header';
import { Button, Pagination } from 'tdesign-vue-next';

const RuleList = defineComponent({
  name: 'RuleList',
  setup() {
    const pagination = reactive({
      total: 0,
      page: 1,
      pageSize: 10
    });

    const onAdd = () => {
      console.log('onAdd');
    };

    return () => {
      return (
        <div class={styles['rule-list']}>
          <EPageHeader title="规则列表">
            <Button onClick={onAdd}>创建规则链</Button>
          </EPageHeader>
          <div class={styles.container}>
            <div class={styles.cards}></div>

            <div class={styles.footer}>
              <Pagination
                total={pagination.total}
                current={pagination.page}
                pageSize={pagination.pageSize}
              ></Pagination>
            </div>
          </div>
        </div>
      );
    };
  }
});

export default RuleList;
