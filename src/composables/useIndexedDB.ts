/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-27 14:13:33
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-27 14:13:33
 * @Description
 */

import { ref } from 'vue';
import usePlugin from './usePlugin';

const useIndexedDB = () => {
  const { debug } = usePlugin();
  const indexedDB = ref<IDBOpenDBRequest>();
  const dbName = ref('');

  /**
   * 打开一个数据库
   * @param dbname 数据库名
   * @param v 数据库版本
   */
  const openDB = (dbname: string, v: number) => {
    dbName.value = dbname;
    indexedDB.value = window.indexedDB.open(dbname, v);
    indexedDB.value.onerror = onerror;

    return indexedDB.value;
  };

  /**
   * 创建一个表
   * @param db 数据库
   * @param name 表名
   * @param option 表配置
   * @param list 索引
   * @param oncomplete 成功回调
   */
  const createObjectStore = (
    db: IDBDatabase,
    name: string,
    option: IDBObjectStoreParameters | undefined,
    list: any[],
    oncomplete: () => void
  ) => {
    const objectStore = db.createObjectStore(name, option);

    list.forEach((key: any) => {
      objectStore.createIndex(key, key, { unique: false });
    });

    objectStore.transaction.oncomplete = () => {
      debug({
        type: 'success create objectStore',
        message: `数据库[${dbName.value}]表(${name})创建成功`,
        status: 'success'
      });

      oncomplete();
    };
  };

  const onerror = (e: Event) => {
    console.log('error', e);
    debug({ type: 'error open DB', message: '打开数据库错误', status: 'error' });
  };

  /**
   * 获取数据库所有数据
   * @param openParams 打开数据库参数
   * @param storeNames 表名
   * @param type 事务模式
   * @param store 表名
   * @param success 成功回调
   */
  const getDBDataAll = (
    openParams: [string, number],
    storeNames: string | string[],
    type: IDBTransactionMode,
    store: string,
    success: (e: Event) => void
  ) => {
    const userDB = openDB(...openParams);
    userDB.onsuccess = (e: Event) => {
      const db = (e.target as IDBRequest<IDBDatabase>)?.result;
      const transaction = db.transaction(storeNames, type).objectStore(store);
      const req = transaction.getAll();
      req.onerror = () => {
        console.log('获取失败');
      };
      req.onsuccess = success;
    };
  };

  return {
    indexedDB,
    openDB,
    createObjectStore,
    getDBDataAll
  };
};

export default useIndexedDB;
