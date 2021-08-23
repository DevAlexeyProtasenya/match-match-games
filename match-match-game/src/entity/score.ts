export class Score {
  public userId: number;

  public score: number;

  public id?: number;

  constructor(score: number, userId: number) {
    this.score = score;
    this.userId = userId;
  }

  public getScore(): number {
    return this.score;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public getUserId(): number {
    return this.userId || -1;
  }

  public setUserId(userId: number): void {
    this.userId = userId;
  }

  public getId(): number {
    return this.id || -1;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
