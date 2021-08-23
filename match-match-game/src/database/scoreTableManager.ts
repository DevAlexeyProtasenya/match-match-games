import { Score } from '../entity/score';

export class ScoreTableManger {
  private readonly indexedDB = window.indexedDB;

  public createRow(score: Score): void {
    const dbConnection = this.indexedDB.open('DevAlexeyProtasenya', 1);
    dbConnection.onsuccess = () => {
      const db = dbConnection.result;
      const trans = db.transaction(Score.name, 'readwrite');
      const tbl = trans.objectStore(Score.name);
      tbl.add(score);
    };
  }

  public deleteRow(id: number): void {
    const dbConnection = this.indexedDB.open('DevAlexeyProtasenya', 1);
    dbConnection.onsuccess = () => {
      const db = dbConnection.result;
      const trans = db.transaction(Score.name, 'readwrite');
      const tbl = trans.objectStore(Score.name);
      tbl.delete(id);
    };
  }

  public getRow(indexName: string, indexValue: string): Promise<IDBValidKey> {
    return new Promise((resolve) => {
      const dbConnection = this.indexedDB.open('DevAlexeyProtasenya', 1);
      dbConnection.onsuccess = () => {
        const db = dbConnection.result;
        const trans = db.transaction(Score.name, 'readonly');
        const tbl = trans.objectStore(Score.name);
        const index = tbl.index(indexName);
        const request = index.get(parseInt(indexValue, 10));
        request.onsuccess = () => resolve(request.result);
      };
    });
  }

  public getAll(): Promise<IDBValidKey> {
    return new Promise((resolve) => {
      const dbConnection = this.indexedDB.open('DevAlexeyProtasenya', 1);
      dbConnection.onsuccess = () => {
        const db = dbConnection.result;
        const trans = db.transaction(Score.name, 'readonly');
        const tbl = trans.objectStore(Score.name);
        const request = tbl.getAll();
        request.onsuccess = () => resolve(request.result);
      };
    });
  }
}
