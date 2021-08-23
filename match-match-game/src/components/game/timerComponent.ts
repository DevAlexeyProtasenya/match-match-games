export class TimerComponent {
  private time: number;

  private interval: NodeJS.Timeout | null;

  constructor() {
    this.time = 0;
    this.interval = null;
  }

  render(rootElement: HTMLElement): HTMLElement {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.textContent = this.convertTime();
    const oldTimer = rootElement.querySelector('.timer');
    if (oldTimer) {
      rootElement.replaceChild(timer, oldTimer);
    } else {
      rootElement.appendChild(timer);
    }
    return timer;
  }

  convertTime(): string {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  startTimer(rootElement: HTMLElement): void {
    this.time = 0;
    this.render(rootElement);
    this.interval = setInterval(() => {
      this.time++;
      this.render(rootElement);
    }, 1000);
  }

  stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getTime(): number {
    return this.time;
  }
}
