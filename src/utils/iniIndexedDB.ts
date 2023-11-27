import useIndexedDB from '@/composables/useIndexedDB';

const { openDB, createObjectStore } = useIndexedDB();

// 创建用户存储对象
const initUserAdmin = () => {
  const keys = ['name', 'phone', 'email', 'wechat', 'qq', 'createdAt'];
  const userDb = openDB('userAdmin', 1);
  userDb.onupgradeneeded = (e) => {
    const db = (e.target as IDBRequest<IDBDatabase>).result;

    db.onerror = (e) => {
      console.log('[userAdmin list] db error', e);
    };

    createObjectStore(db, 'list', { keyPath: 'id', autoIncrement: true }, keys, () => {
      const transaction = db.transaction('list', 'readwrite').objectStore('list');
      [
        {
          name: 'Yang Dong nan',
          wechat: 'nan1010082085',
          qq: '1010082085',
          email: '',
          phone: '15117960621',
          role: '',
          createdAt: '2023-11-23 16:26:06',
          updatedAt: '2023年11月23日 16:26:13'
        }
      ].forEach((item) => {
        transaction.add(item);
      });
    });
  };
};

// 创建角色存储对象
const initRoleAdmin = () => {
  const keys = ['name', 'roles', 'status', 'createdAt', 'updatedAt'];
  const userDb = openDB('userRole', 1);
  userDb.onupgradeneeded = (e) => {
    const db = (e.target as IDBRequest<IDBDatabase>).result;

    db.onerror = (e) => {
      console.log('[userRole list] db error', e);
    };

    createObjectStore(db, 'list', { keyPath: 'id', autoIncrement: true }, keys, () => {
      const transaction = db.transaction('list', 'readwrite').objectStore('list');
      [
        {
          name: '普通管理员',
          roles: [
            {
              name: '首页',
              path: '/home'
            }
          ],
          status: 1,
          createdAt: '2023-11-23 16:26:06',
          updatedAt: '2023年11月23日 16:26:13'
        }
      ].forEach((item) => {
        transaction.add(item);
      });
    });
  };
};

export { initUserAdmin, initRoleAdmin };
