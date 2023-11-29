// 用户管理
import { computed, defineComponent, onMounted, ref, reactive, watch } from 'vue';
import styles from './index.module.scss';
import {
  BaseTable,
  Button,
  Layout,
  Pagination,
  Space,
  type BaseTableCellParams,
  type RowEventContext,
  type BaseTableCol,
  type TableRowData
} from 'tdesign-vue-next';
import EPageHeader from '@/components/e-page-header';
import { getUserAmdinList } from '@/api/user.api';
import type { UserAdminModels } from '@/constants/user.models';
import { DebugType } from '@/constants/debug.models';
import usePlugin from '@/composables/usePlugin';
import { useRoute } from 'vue-router';
import useIndexedDB from '@/composables/useIndexedDB';

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
  name: 'EUserAdmin',
  setup() {
    const route = useRoute();
    const { getDBDataAll, getDBDataById } = useIndexedDB();
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

    // const init = () => {
    //   getUserAmdinList().then((res) => {
    //     userData.value = res.data;
    //   });
    // };

    const onRowClick = async (row: UserAdminModels) => {
      const path = route.path + '-> userAdmin.on-row-click';
      debug({ type: DebugType.USER_ADMIN, alias: '行点击', path, message: row.id, status: 'info' });
      const user = await getDataById(row.id);
      console.log(user);
    };

    const onEdit = (row: UserAdminModels) => {
      const path = route.path + ' -> userAdmin.on-edit';
      debug({ type: DebugType.USER_ADMIN, alias: '编辑', path, message: row, status: 'info' });
    };

    const onDel = (row: UserAdminModels) => {
      const path = route.path + ' -> userAdmin.on-del';
      debug({ type: DebugType.USER_ADMIN, alias: '删除', path, message: row, status: 'info' });

      //...
    };

    const getIndexedDBUserAdminByList = () => {
      getDBDataAll(['userAdmin', 1], ['list'], 'readonly', 'list', (e: Event) => {
        userData.value = (e.target as IDBRequest<UserAdminModels[]>)?.result;
      });
    };

    /**
     * 获取用户信息
     * @param id
     */
    const getDataById = async (id: string) => {
      return new Promise((resolve) => {
        getDBDataById(['userAdmin', 1], ['list'], 'readonly', 'list', id, (e: Event) => {
          resolve((e.target as IDBRequest<UserAdminModels[]>)?.result);
        });
      });
    };

    onMounted(() => {
      getIndexedDBUserAdminByList();
      // init();
    });

    return () => (
      <div class={styles['page-user-admin']}>
        <EPageHeader title="用户管理"></EPageHeader>
        <Space class={'table-container'} direction="vertical">
          <BaseTable
            rowKey="id"
            data={userData.value}
            columns={userColums.value}
            onRowClick={({ row }) => onRowClick(row as UserAdminModels)}
          ></BaseTable>
          <div class={'footer'}>
            <Pagination total={pagination.total} pageSize={pagination.limit} current={pagination.page}></Pagination>
          </div>
        </Space>
      </div>
    );
  }
});

export default EUserAdmin;
