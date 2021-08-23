export class TableInfo {
  private tableName: string;

  private primaryFieldName: string;

  private primaryIndexName: string;

  constructor(
    tableName: string,
    primaryFieldName: string,
    primaryIndexName: string,
  ) {
    this.tableName = tableName;
    this.primaryFieldName = primaryFieldName;
    this.primaryIndexName = primaryIndexName;
  }

  public getTableName(): string {
    return this.tableName;
  }

  public getPrimaryFieldName(): string {
    return this.primaryFieldName;
  }

  public getPrimaryIndexName(): string {
    return this.primaryIndexName;
  }

  public toString(): string {
    return `{tableName: "${this.tableName}",
     primaryFieldName: "${this.primaryFieldName}",
     primaryIndexName: "${this.primaryIndexName}"}`;
  }
}
