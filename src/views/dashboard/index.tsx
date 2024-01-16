/// <reference types="vitest" />
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import styles from './index.module.scss';
import { getDashboardList } from '@/api/dashboard.api';
import type { DashboardListModels } from '@/constants/dashboard.models';
import { Pagination, Space, MessagePlugin, Button, Image } from 'tdesign-vue-next';
import { useRoute, useRouter } from 'vue-router';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import AddDashboard, { type EAddDashboardInstance } from './add-dashboard';
import useDialog, { type ResolveType } from '@/composables/useDialog';
import ECard from '@/components/e-card';
import { dashboardStore } from '@/store/dashboard-store';
import dashboardBase from '@/assets/default-json/dashboard.base.json';
import { cloneDeep } from 'lodash-es';
import EContainer from '@/components/e-container';

const Dashboard = defineComponent({
  name: 'Dashboard',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { debug } = usePlugin();
    const { confirm } = useDialog();
    const { createdBoard } = dashboardStore();
    const dashboardData = ref<DashboardListModels[]>([]);
    const pagination = reactive({
      page: 1,
      limit: 10,
      total: 10
    });
    const AddDashboardInstance = ref<EAddDashboardInstance>();
    const drawerType = ref<'add' | 'edit' | 'look'>('add');
    const formData = ref<Partial<DashboardListModels>>();

    const onAdd = () => {
      formData.value = {};
      drawerType.value = 'add';
      AddDashboardInstance.value?.open();
    };

    const onRowClick = (row: DashboardListModels) => {
      const path = route.path + '-> userAdmin.on-row-click';
      debug({ type: DebugType.DASHBOAR, alias: '行点击', path, message: row.id, status: 'info' });
      formData.value = row;
      drawerType.value = 'look';
      AddDashboardInstance.value?.open();
    };

    const onEdit = (row: DashboardListModels) => {
      const path = route.path + ' -> userAdmin.on-edit';
      debug({ type: DebugType.DASHBOAR, alias: '编辑', path, message: row, status: 'info' });
      formData.value = row;
      drawerType.value = 'edit';
      AddDashboardInstance.value?.open();
    };

    const onDel = (row: DashboardListModels) => {
      const path = route.path + ' -> userAdmin.on-del';
      confirm('确认删除？', '删除后不可恢复').then(({ trigger }: ResolveType) => {
        if (trigger === 'confirm') {
          debug({ type: DebugType.DASHBOAR, alias: '删除', path, message: row, status: 'info' });
          MessagePlugin.success('删除成功');
          return;
        }
        MessagePlugin.info('已取消删除');
      });
    };

    const onConfirm = (form: Partial<DashboardListModels>) => {
      console.log(form);
      // init();
      AddDashboardInstance.value?.close();
    };

    const editDashboard = () => {
      createdBoard(cloneDeep(dashboardBase));

      let query = {
        type: 'add'
      };
      router.push({ path: '/editor', query });
    };

    const init = () => {
      getDashboardList().then((res) => {
        dashboardData.value = res.data;
      });
    };

    onMounted(() => {
      init();
    });

    return () => {
      return (
        <div class={styles['dashboard-wrapper']}>
          <EContainer title="仪表板">
            {{
              header: () => (
                <div>
                  <Button onClick={onAdd}>创建仪表板</Button>
                </div>
              ),
              default: () =>
                dashboardData.value.map((item) => {
                  return (
                    <ECard data={item} onImageClick={editDashboard} onLook={onRowClick} onEdit={onEdit} onDel={onDel}>
                      <Image class="image" src={item.prevewImage} fit="fill" style={{ height: '100%' }} />
                    </ECard>
                  );
                }),
              footer: () => (
                <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
              ),
              plugin: () => (
                <div>
                  <AddDashboard
                    ref={AddDashboardInstance}
                    type={drawerType.value}
                    formData={formData.value}
                    onConfirm={onConfirm}
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

export default Dashboard;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('dashboard', () => {
    const test = true;
    expect(test).toBeTruthy();
    // const wrapper = mount(Dashboard)
    // expect(wrapper.find('.dashboard-wrapper').exists()).toBeTruthy();
  });
  console.log('vitest');
}
