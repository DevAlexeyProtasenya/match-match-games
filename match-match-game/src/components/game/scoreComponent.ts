export class ScoreComponent {
  private score: number;

  private compareCount: number;

  private wrongCompareCount: number;

  constructor() {
    this.score = 0;
    this.compareCount = 0;
    this.wrongCompareCount = 0;
  }

  getScore(): number {
    return this.score > 0 ? this.score : 0;
  }

  setScore(score: number): void {
    this.score = score;
  }

  getCompareCount(): number {
    return this.compareCount;
  }

  setCompareCount(compareCount: number): void {
    this.compareCount = compareCount;
  }

  getWrongCompareCount(): number {
    return this.wrongCompareCount;
  }

  setWrongCompareCount(wrongCompareCount: number): void {
    this.wrongCompareCount = wrongCompareCount;
  }

  addCompare(): void {
    this.compareCount++;
  }

  addWrongCompare(): void {
    this.wrongCompareCount++;
  }

  countScore(time: number): void {
    this.score = (this.compareCount - this.wrongCompareCount) * 100 - time * 10;
  }
}
