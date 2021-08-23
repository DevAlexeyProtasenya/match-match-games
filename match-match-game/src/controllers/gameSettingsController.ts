export class GameSettingsController {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  addListeners(): void {
    const button = this.element.querySelector('button');
    const cards = this.element.querySelectorAll('select')[0];
    const difficulty = this.element.querySelectorAll('select')[1];
    const stored = [
      window.localStorage.getItem('cards'),
      window.localStorage.getItem('difficulty'),
    ];

    const checkOnChangesHandler = () => {
      if (cards.value === stored[0] && difficulty.value === stored[1]) {
        button?.setAttribute('disabled', 'true');
      } else {
        button?.removeAttribute('disabled');
      }
    };

    const applyButtonHendler = () => {
      const selects = this.element.querySelectorAll('select');
      window.localStorage.setItem('cards', selects[0].value);
      window.localStorage.setItem('difficulty', selects[1].value);
      if (stored) {
        stored[0] = selects[0].value;
        stored[1] = selects[1].value;
      }
      button?.setAttribute('disabled', 'true');
      this.element.querySelectorAll('label')[2].style.display = 'block';
      setTimeout(() => {
        this.element.querySelectorAll('label')[2].style.display = 'none';
      }, 3000);
    };

    button?.addEventListener('click', applyButtonHendler);
    cards.addEventListener('change', checkOnChangesHandler);
    difficulty.addEventListener('change', checkOnChangesHandler);
  }
}
