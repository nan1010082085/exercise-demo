import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import EPageHeader from '@/components/e-page-header';
import styles from './index.module.scss';
import { getDashboardList } from '@/api/dashboard.api';
import type { DashboardListModels } from '@/constants/dashboard.models';
import { Pagination, Space, Table, type BaseTableCellParams, Button, type TableRowData, Tag } from 'tdesign-vue-next';
import { useRoute } from 'vue-router';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import type { an } from 'vitest/dist/reporters-cb94c88b.js';

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
  },
  {
    colKey: 'updatetime',
    title: '更新时间'
  }
];

const Dashboard = defineComponent({
  setup() {
    const route = useRoute();
    const { debug } = usePlugin();
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
          title: '操作',
          colKey: 'operation',
          fixed: 'right',
          cell: (_h: any, { row }: BaseTableCellParams<DashboardListModels>) => {
            return (
              <Space>
                <Button theme="primary" onClick={() => onEdit(row)}>
                  编辑
                </Button>
                <Button theme="default" onClick={() => onDel(row)}>
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

    const onRowClick = (row: DashboardListModels) => {
      const path = route.path + '-> userAdmin.on-row-click';
      debug({ type: DebugType.DASHBOAR, alias: '行点击', path, message: row.id, status: 'info' });
    };

    const onEdit = (row: DashboardListModels) => {
      const path = route.path + ' -> userAdmin.on-edit';
      debug({ type: DebugType.DASHBOAR, alias: '编辑', path, message: row, status: 'info' });
    };

    const onDel = (row: DashboardListModels) => {
      const path = route.path + ' -> userAdmin.on-del';
      debug({ type: DebugType.DASHBOAR, alias: '删除', path, message: row, status: 'info' });
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
          <EPageHeader title="仪表板"></EPageHeader>
          <Space class={['table-container']} direction="vertical">
            <Table
              rowKey="id"
              data={dashboardData.value}
              columns={columnDatas.value}
              onRowClick={({ row }) => onRowClick(row as DashboardListModels)}
            ></Table>
            <div class={['footer']}>
              <Pagination total={pagination.total} current={pagination.page} pageSize={pagination.limit}></Pagination>
            </div>
          </Space>
        </div>
      );
    };
  }
});

export default Dashboard;
