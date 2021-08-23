import avatarSRC from '../../assets/images/registration/avatar.png';

export class RegisterComponent {
  private readonly element: HTMLElement;

  private readonly playButton: HTMLButtonElement;

  private readonly image: HTMLImageElement;

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('div');
    this.playButton = document.createElement('button');
    this.image = document.createElement('img');
  }

  render(): HTMLElement {
    const userAvatar = window.localStorage.getItem('avatar');
    this.playButton.textContent = 'Play game';
    this.playButton.classList.add('header__play-button');
    this.playButton.addEventListener('click', () => {
      window.location.href = `${window.location.href.replace(
        /#.*$/,
        '',
      )}#/game`;
    });
    this.element.classList.add('registrated');
    this.element.appendChild(this.playButton);
    this.image.src = userAvatar || avatarSRC;
    this.element.appendChild(this.image);
    return this.element;
  }
}
