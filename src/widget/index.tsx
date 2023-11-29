import EPageHeader from '@/components/e-page-header';
import { defineComponent, reactive, ref } from 'vue';
import styles from './styles/index.module.scss';
import { Button, Pagination, Image } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import WidgetCard, { type TData } from './components/widget-card';
import AddDashboard, { type EAddDashboardInstance } from '@/views/dashboard/add-dashboard';

const Widget = defineComponent({
  name: 'Widget',
  setup() {
    const router = useRouter();
    const pagination = reactive({
      total: 10,
      page: 1,
      pageSize: 10
    });
    const AddDashboardInstance = ref<EAddDashboardInstance>();
    const formData = ref({});

    const widgets = ref<TData[]>([{ title: '测试', imageUrl: '' }]);

    const craeteDashboard = (row: any) => {
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
          <EPageHeader title="部件列表">
            <Button onClick={onAddDashboard}>创建仪表板</Button>
          </EPageHeader>
          <div class={styles.container}>
            <div class={styles.cards}>
              {widgets.value.map((item) => {
                return (
                  <WidgetCard data={item}>
                    <Image src={item.imageUrl} fit="fill" style={{ height: '100%' }} />
                  </WidgetCard>
                );
              })}
            </div>

            <div class={styles.footer}>
              <Pagination
                total={pagination.total}
                current={pagination.page}
                pageSize={pagination.pageSize}
              ></Pagination>
            </div>
          </div>

          <AddDashboard
            ref={AddDashboardInstance}
            type={'add'}
            formData={formData.value}
            onConfirm={onAddDashboardConfirm}
          />
        </div>
      );
    };
  }
});

export default Widget;
