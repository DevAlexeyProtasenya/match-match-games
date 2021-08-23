import { TableInfo } from './tableInfo';
import array from './tables.json';

export class DatabaseManager {
  public indxDB: IDBFactory;

  public tInfos!: Array<TableInfo>;

  public db!: IDBDatabase;

  constructor(public dbName: string) {
    this.indxDB = window.indexedDB;
    this.openDB();
  }

  public openDB(): void {
    const request = this.indxDB.open(this.dbName, 1);
    request.onupgradeneeded = () => {
      this.db = request.result;
      this.tInfos = DatabaseManager.getTablesByJSON();
      this.addTables(this.db);
    };
    request.onsuccess = () => {
      this.db = request.result;
    };
  }

  public addTables(db: IDBDatabase): void {
    this.db = db;
    let param: IDBObjectStoreParameters;
    this.tInfos.forEach((element) => {
      param = {
        keyPath: element.getPrimaryFieldName(),
        autoIncrement: true,
      };
      const objStorage = this.db.createObjectStore(
        element.getTableName(),
        param,
      );
      objStorage.createIndex(
        `${element.getPrimaryIndexName()}_idx`,
        element.getPrimaryIndexName(),
      );
    });
  }

  public static getTablesByJSON(): Array<TableInfo> {
    const tis: Array<TableInfo> = new Array<TableInfo>();
    array.forEach((element) => {
      const table = new TableInfo(
        element.tablename,
        element.primaryFieldName,
        element.primaryIndexName,
      );
      tis.push(table);
    });
    return tis;
  }
}
