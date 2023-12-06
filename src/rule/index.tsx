import { defineComponent, reactive } from 'vue';
import styles from './styles/index.module.scss';
import { Button, Pagination } from 'tdesign-vue-next';
import EContainer from '@/components/e-container';

const RuleList = defineComponent({
  name: 'RuleList',
  setup() {
    const pagination = reactive({
      total: 0,
      page: 1,
      limit: 10
    });

    const onAdd = () => {
      console.log('onAdd');
    };

    return () => {
      return (
        <div class={styles['rule-list']}>
          <EContainer title="规则列表">
            {{
              header: () => (
                <>
                  <Button onClick={onAdd}>创建规则链</Button>
                </>
              ),
              default: () => <div></div>,
              footer: () => (
                <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
              ),
              plugin: () => <div></div>
            }}
          </EContainer>
        </div>
      );
    };
  }
});

export default RuleList;
