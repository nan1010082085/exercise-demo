import { defineComponent, onMounted, reactive } from 'vue';
import styles from './index.module.scss';
import { Button, Pagination } from 'tdesign-vue-next';
import EContainer from '@/components/e-container';
import { useRouter } from 'vue-router';

const RuleLink = defineComponent({
  name: 'RuleLink',
  setup() {
    const router = useRouter();
    const pagination = reactive({
      total: 10,
      page: 1,
      limit: 10
    });

    const onAdd = () => {
      console.log('onAdd');
      router.push({ name: 'RuleEditor' });
    };

    onMounted(() => {
      // #TODO 直接跳转规则编辑界面（测试）
      router.push({ name: 'RuleEditor' });
    });

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
              default: () => <div>container</div>,
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
