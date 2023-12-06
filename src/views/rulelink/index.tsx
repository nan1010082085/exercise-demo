import { defineComponent, reactive } from 'vue';
import styles from './index.module.scss';
import EPageHeader from '@/components/e-page-header';
import { Button, Pagination } from 'tdesign-vue-next';
import EContainer from '@/components/e-container';

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
          <EContainer title="规则链">
            {{
              header: () => (
                <div>
                  <Button onClick={onAdd}>创建规则链</Button>
                </div>
              ),
              default: () => <div></div>,
              footer: () => (
                <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
              )
            }}
          </EContainer>
        </div>
      );
    };
  }
});

export default RuleLink;
