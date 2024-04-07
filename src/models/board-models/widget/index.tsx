import { defineComponent, reactive, ref } from 'vue';
import styles from './styles/index.module.scss';
import { Button, Pagination, Image } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import ECard, { type TData } from '../components/e-card';
import AddDashboard, { type EAddDashboardInstance } from '@/views/dashboard/add-dashboard';
import { cloneDeep } from 'lodash-es';
import dashboardBase from '@/assets/default-json/dashboard.base.json';
import { dashboardStore } from '@/store/dashboard-store';
import './lib/manifest';
import EContainer from '@/components/e-container';

const Widget = defineComponent({
  name: 'Widget',
  setup() {
    const router = useRouter();
    const { createdBoard } = dashboardStore();
    const pagination = reactive({
      total: 10,
      page: 1,
      pageSize: 10
    });
    const AddDashboardInstance = ref<EAddDashboardInstance>();
    const formData = ref({});
    const widgets = ref<TData[]>([{ name: '测试', imageUrl: '' }]);

    const craeteDashboard = (row: any) => {
      // 创建仪表盘
      createdBoard(cloneDeep(dashboardBase));

      let query = {
        type: 'add'
      };
      router.push({ path: '/editor', query });
    };

    const onAddDashboard = () => {
      AddDashboardInstance.value?.open();
    };

    const onAddDashboardConfirm = () => {
      craeteDashboard(formData.value);
    };

    return () => {
      return (
        <div class={styles.widget}>
          <EContainer title="部件列表">
            {{
              header: () => <Button theme="primary" onClick={onAddDashboard}>
                新建仪表盘
              </Button>,
              default: () =>
                widgets.value.map((item, i) => {
                  return (
                    <ECard key={i} data={item} lookBtn={false}>
                      <Image src={item.imageUrl} fit="fill" style={{ height: '100%' }} />
                    </ECard>
                  );
                }),
              footer: () => (
                <Pagination
                  total={pagination.total}
                  current={pagination.page}
                  pageSize={pagination.pageSize}
                ></Pagination>
              ),
              pulgin: () => (
                <div>
                  <AddDashboard
                    ref={AddDashboardInstance}
                    type={'add'}
                    formData={formData.value}
                    onConfirm={onAddDashboardConfirm}
                  />
                </div>
              )
            }}
          </EContainer>
        </div>
      );
    };
  }
});

export default Widget;
