// 用户管理
import { computed, defineComponent, onMounted, ref, reactive } from 'vue';
import styles from './index.module.scss';
import { BaseTable, Button, Layout, Pagination, Space, type BaseTableCellParams, type TableRowData } from 'tdesign-vue-next';
import EPageHeader from '@/components/e-page-header';
import { getUserAmdinList } from '@/api/user.api';
import type { UserAdminModels } from '@/constants/user.models';
import { DebugType } from '@/constants/debug.models';
import usePlugin from '@/composables/usePlugin';
import { useRoute } from 'vue-router';

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
    colKey: 'phone',
    title: '手机号'
  },
  {
    colKey: 'email',
    title: '邮箱'
  },
  {
    colKey: 'wechat',
    title: '微信'
  },
  {
    colKey: 'qq',
    title: 'QQ'
  },
  {
    colKey: 'createdAt',
    title: '创建时间'
  }
];

const EUserAdmin = defineComponent({
  setup() {
    const route = useRoute();
    const { debug } = usePlugin();
    const userData = ref<UserAdminModels[]>([]);
    const userColums = computed<TableRowData[]>(() => {
      return [
        ...columnDatas,
        {
          title: '操作',
          colKey: 'operation',
          fixed: 'right',
          cell: (_h: any, { row }: BaseTableCellParams<UserAdminModels>) => {
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

    const init = () => {
      getUserAmdinList().then((res) => {
        userData.value = res.data;
      });
    };

    const onRowClick = (row: UserAdminModels) => {
      console.log(row);
      const path = route.path + '-> userAdmin.on-row-click';
      debug({ type: DebugType.USER_ADMIN, alias: '行点击', path, message: row.id, status: 'info' });
    };

    const onEdit = (row: UserAdminModels) => {
      const path = route.path + ' -> userAdmin.on-edit';
      debug({ type: DebugType.USER_ADMIN, alias: '编辑', path, message: row, status: 'info' });
    };

    const onDel = (row: UserAdminModels) => {
      const path = route.path + ' -> userAdmin.on-del';
      debug({ type: DebugType.USER_ADMIN, alias: '删除', path, message: row, status: 'info' });
    };

    onMounted(() => {
      init();
    });

    return () => (
      <div class={styles['page-user-admin']}>
        <EPageHeader title="用户管理"></EPageHeader>
        <Space class={styles.container} direction="vertical">
          <BaseTable
            rowKey="id"
            data={userData.value}
            columns={userColums.value}
            onRowClick={({ row }) => onRowClick(row as UserAdminModels)}
          ></BaseTable>
          <div class={styles.footer}>
            <Pagination total={pagination.total} pageSize={pagination.limit} current={pagination.page}></Pagination>
          </div>
        </Space>
      </div>
    );
  }
});

export default EUserAdmin;
