import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import styles from './index.module.scss';
import {
  BaseTable,
  Button,
  Pagination,
  Space,
  type BaseTableCellParams,
  type TableRowData,
  Tag
} from 'tdesign-vue-next';
import { useRoute } from 'vue-router';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import useIndexedDB from '@/composables/useIndexedDB';
import EContainer from '@/components/e-container';
import type { UserRoleModels } from '@/@types/user';

const columnDatas = [
  {
    colKey: 'id',
    title: 'ID',
    width: '50'
  },
  {
    colKey: 'name',
    title: '名称'
  }
];

const EUserRole = defineComponent({
  name: 'EUserRole',
  setup() {
    const route = useRoute();
    const { getDBDataAll, getDBDataById } = useIndexedDB();
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
          colKey: 'createdAt',
          title: '创建时间'
        },
        {
          colKey: 'operation',
          title: '操作',
          fixed: 'right',
          cell: (_h: any, { row }: BaseTableCellParams<UserRoleModels>) => {
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
    //   getUserRoleList().then((res) => {
    //     console.log(res.data);
    //     roleData.value = res.data;
    //   });
    // };

    const onRowClick = async (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-row-click';
      debug({ type: DebugType.USER_ROLE, alias: '行点击', path, message: row.id, status: 'info' });
      const role = await getDataById(row.id);
      console.log(role);
    };

    const onEdit = (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-edit';
      debug({ type: DebugType.USER_ROLE, alias: '编辑', path, message: row, status: 'info' });
    };

    const onDel = (row: UserRoleModels) => {
      const path = route.path + ' -> userRole.on-del';
      debug({ type: DebugType.USER_ROLE, alias: '删除', path, message: row, status: 'info' });
    };

    const getIndexedDBRoleAdminByList = () => {
      getDBDataAll(['userRole', 1], ['list'], 'readonly', 'list', (e: Event) => {
        roleData.value = (e.target as IDBRequest<UserRoleModels[]>)?.result;
      });
    };

    /**
     * 获取角色信息
     * @param id
     */
    const getDataById = async (id: string) => {
      return new Promise((resolve) => {
        getDBDataById(['userRole', 1], ['list'], 'readonly', 'list', id, (e: Event) => {
          resolve((e.target as IDBRequest<UserRoleModels[]>)?.result);
        });
      });
    };

    onMounted(() => {
      getIndexedDBRoleAdminByList();
      // init();
    });

    return () => {
      return (
        <div class={styles['page-user-role']}>
          <EContainer title="角色管理">
            {{
              default: () => (
                <BaseTable
                  rowKey="id"
                  data={roleData.value}
                  columns={roleColums.value}
                  onRowClick={({ row }) => onRowClick(row as UserRoleModels)}
                ></BaseTable>
              ),
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

export default EUserRole;
