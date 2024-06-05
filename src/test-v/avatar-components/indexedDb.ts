class CatchDb {
  #db: IDBOpenDBRequest;
  #queue: any[];
  storeName: string;
  constructor(dbName: string, version: number, storeName: string) {
    if (!window.indexedDB) {
      throw new Error('您的浏览器不支持 IndexedDb 数据库。');
    }
    this.storeName = storeName;
    this.#db = window.indexedDB.open(dbName, version);
    this.#db.onupgradeneeded = () => this.onupgradeneeded(this.#db.result, this.storeName);
    this.#db.onerror = this.onerror;
    this.#db.onsuccess = this.onsucess;
  }

  private onupgradeneeded(db: IDBDatabase, name: string) {
    console.log(this);
    const objectStore = db.createObjectStore(name, { keyPath: 'id' });

    objectStore.createIndex('name', 'name', { unique: true });

    objectStore.transaction.oncomplete = () => {
      console.log('创建数据表', name);

      if (this.#queue.length) {
        this.create();
      }
    };
  }

  private onerror(ev: Event) {}

  private onsucess(ev: Event) {
    const db = ev.target;
    const type = ev.type;
    console.log(db, type);
  }

  get(id: string) {
    const objectstore = this.#db.result.transaction(this.storeName).objectStore(this.storeName);
    return objectstore.get(id);
  }

  add(data: any) {
    this.#queue.push(data);
  }

  create() {
    const transaction = this.#db.result.transaction(this.storeName, 'readwrite');
    const objectstore = transaction.objectStore(this.storeName);
    while (this.#queue.length) {
      const data = this.#queue.shift();
      objectstore.add(data);
    }
  }

  delete() {}
}

export default CatchDb;
