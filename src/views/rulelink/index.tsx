import { defineComponent, reactive } from 'vue';
import styles from './index.module.scss';
import EPageHeader from '@/components/e-page-header';
import { Button, Pagination } from 'tdesign-vue-next';

const RuleLink = defineComponent({
  name: 'RuleLink',
  setup() {
    const pagination = reactive({
      total: 10,
      page: 1,
      limit: 10
    });

    const onAdd = () => {
      console.log('onAdd');
    };

    return () => {
      return (
        <div class={styles.rulelink}>
          <EPageHeader title="规则链">
            <Button onClick={onAdd}>创建规则链</Button>
          </EPageHeader>
          <div class={styles.container}>
            <div class={styles.cards}></div>

            <div class={styles.footer}>
              <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
            </div>
          </div>
        </div>
      );
    };
  }
});

export default RuleLink;
