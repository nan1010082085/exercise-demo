import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import EPageHeader from '@/components/e-page-header';
import styles from './index.module.scss';
import { getDashboardList } from '@/api/dashboard.api';
import type { DashboardListModels } from '@/constants/dashboard.models';
import {
  Pagination,
  Space,
  Table,
  MessagePlugin,
  type BaseTableCellParams,
  Button,
  type TableRowData,
  Tag
} from 'tdesign-vue-next';
import { useRoute } from 'vue-router';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import AddDashboard, { type EAddDashboardInstance } from './add-dashboard';
import useDialog, { type ResolveType } from '@/composables/useDialog';

const columns = [
  {
    colKey: 'id',
    title: 'ID',
    width: 50
  },
  {
    colKey: 'name',
    title: '名称'
  },
  {
    colKey: 'description',
    title: '名称'
  },
  {
    colKey: 'author',
    title: '创建人'
  }
];

const Dashboard = defineComponent({
  setup() {
    const route = useRoute();
    const { debug } = usePlugin();
    const { confirm } = useDialog();
    const dashboardData = ref<DashboardListModels[]>([]);
    const columnDatas = computed<TableRowData[]>(() => {
      return [
        ...columns,
        {
          colKey: 'status',
          title: '状态',
          cell: (_h: any, { row }: BaseTableCellParams<DashboardListModels>) => {
            return <Tag theme={row.status === 1 ? 'success' : 'danger'}>{row.status === 1 ? '启用中' : '未启用'}</Tag>;
          }
        },
        {
          colKey: 'updatetime',
          title: '更新时间'
        },
        {
          title: '操作',
          colKey: 'operation',
          fixed: 'right',
          cell: (_h: any, { row }: BaseTableCellParams<DashboardListModels>) => {
            return (
              <Space size={'small'}>
                <Button
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                >
                  编辑
                </Button>
                <Button
                  theme="default"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    onDel(row);
                  }}
                >
                  删除
                </Button>
              </Space>
            );
          }
        }
      ];
    });
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
          <EPageHeader title="仪表板">
            <Button onClick={onAdd}>创建仪表板</Button>
          </EPageHeader>
          <Space class={['table-container']} direction="vertical">
            <Table
              rowKey="id"
              data={dashboardData.value}
              columns={columnDatas.value}
              onRowClick={({ row }: TableRowData) => onRowClick(row as DashboardListModels)}
            ></Table>
            <div class={['footer']}>
              <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
            </div>
          </Space>

          <AddDashboard
            ref={AddDashboardInstance}
            type={drawerType.value}
            formData={formData.value}
            onConfirm={onConfirm}
          />
        </div>
      );
    };
  }
});

export default Dashboard;
