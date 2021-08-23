import { User } from '../entity/user';

export class UserTableManger {
  public db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  public createRow(user: User): Promise<IDBValidKey> {
    return new Promise((resolve) => {
      const trans = this.db.transaction([User.name], 'readwrite');
      const tbl = trans.objectStore(User.name);
      const request = tbl.add(user);
      request.onsuccess = () => resolve(request.result);
    });
  }

  public getRow(id: number): Promise<IDBValidKey> {
    return new Promise((resolve) => {
      const trans = this.db.transaction([User.name], 'readwrite');
      const tbl = trans.objectStore(User.name);
      const request = tbl.get(id);
      request.onsuccess = () => resolve(request.result);
    });
  }
}
