import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import styles from './index.module.scss';
import {
  BaseTable,
  Button,
  Layout,
  Pagination,
  Space,
  type BaseTableCellParams,
  type TableRowData,
  Tag
} from 'tdesign-vue-next';
import EPageHeader from '@/components/e-page-header';
import type { UserRoleModels } from '@/constants/user.models';
import { useRoute } from 'vue-router';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import { getUserRoleList } from '@/api/user.api';

const columnDatas = [
  {
    colKey: 'id',
    title: 'ID',
    width: '50'
  },
  {
    colKey: 'name',
    title: '名称'
  },
  {
    colKey: 'createdAt',
    title: '创建时间'
  }
];

const EUserRole = defineComponent({
  setup() {
    const route = useRoute();
    const { debug } = usePlugin();
    const roleData = ref<UserRoleModels[]>([]);
    const roleColums = computed<TableRowData[]>(() => {
      return [
        ...columnDatas,
        {
          colKey: 'roles',
          title: '权限',
          cell: (_h: any, { row }: BaseTableCellParams<UserRoleModels>) => {
            return row.roles.map((item) => item.name).join('、');
          }
        },
        {
          colKey: 'status',
          title: '状态',
          cell: (_h: any, { row }: BaseTableCellParams<UserRoleModels>) => {
            return <Tag theme={row.status === 1 ? 'success' : 'danger'}>{row.status === 1 ? '启用' : '禁用'}</Tag>;
          }
        },
        {
          colKey: 'operation',
          title: '操作',
          fixed: 'right',
          cell: (_h: any, { row }: BaseTableCellParams<UserRoleModels>) => {
            return (
              <Space size={'small'}>
                <Button onClick={() => onEdit(row)}>编辑</Button>
                <Button theme='default' onClick={() => onDel(row)}>删除</Button>
              </Space>
            );
          }
        }
      ];
    });
    const pagination = reactive({
      paga: 1,
      limit: 10,
      total: 10
    });

    const init = () => {
      getUserRoleList().then((res) => {
        console.log(res.data);
        roleData.value = res.data;
      });
    };

    const onRowClick = (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-row-click';
      debug({ type: DebugType.USER_ROLE, alias: '行点击', path, message: row.id, status: 'info' });
    };

    const onEdit = (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-edit';
      debug({ type: DebugType.USER_ROLE, alias: '编辑', path, message: row, status: 'info' });
    };
    const onDel = (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-del';
      debug({ type: DebugType.USER_ROLE, alias: '删除', path, message: row, status: 'info' });
    };

    onMounted(() => {
      init();
    });

    return () => {
      return (
        <div class={styles['page-user-role']}>
          <EPageHeader title="角色管理"></EPageHeader>
          <Space class={styles.container} direction="vertical">
            <BaseTable
              rowKey="id"
              data={roleData.value}
              columns={roleColums.value}
              onRowClick={({ row }) => onRowClick(row as UserRoleModels)}
            ></BaseTable>
            <div class={styles.footer}>
              <Pagination total={pagination.total} current={pagination.paga} pageSize={pagination.limit}></Pagination>
            </div>
          </Space>
        </div>
      );
    };
  }
});

export default EUserRole;
