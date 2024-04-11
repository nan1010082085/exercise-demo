import { computed, defineComponent, reactive } from 'vue';
import styles from './styles/index.module.scss';
import { Button, Pagination, Image } from 'tdesign-vue-next';
import EContainer from '@components/e-container';
import { mainfestInstall } from '@/utils'
import { categoryConfig } from './lib/config'
import ECard from '@components/e-card';

const RuleList = defineComponent({
  name: 'RuleList',
  setup() {
    const pagination = reactive({
      total: 0,
      page: 1,
      limit: 10
    });

    const list = computed(() => {
      let componentKeys = categoryConfig.flatMap((c) => c.children) as string[];
      return componentKeys.map((k) => mainfestInstall(k, 'flow-models'))
    })

    return () => {
      return (
        <div class={styles['rule-list']}>
          <EContainer title="规则列表">
            {{
              default: () => list.value.map((item, i) => {
                return (
                  <ECard key={i} data={item} title={item.name} footer={false} lookBtn={false}>
                    <Image src={item.icon} fit="fill" style={{ height: '100%' }} />
                  </ECard>
                );
              }),
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
