import { Component } from '../component';
import aboutPNG from '../../assets/images/header/about.png';
import scorePNG from '../../assets/images/header/score.png';
import settingsPNG from '../../assets/images/header/settings.png';
import { RegexParser } from '../../router/regexParser';

export class NavComponent implements Component {
  private readonly element: HTMLElement;

  private readonly textNav: Array<string> = [
    'About Game',
    'Best Score',
    'Game Settings',
  ];

  private readonly imagesNav: Array<string> = [aboutPNG, scorePNG, settingsPNG];

  private readonly hrefNav: Array<RegExp> = [/about/, /score/, /settings/];

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('nav');
  }

  render(): HTMLElement {
    this.element.id = 'nav';
    const ul = document.createElement('ul');
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      li.innerHTML += `<a href="#${this.hrefNav[i]}">
                          <img src="${this.imagesNav[i]}" alt="${this.textNav[i]}">
                          <p>${this.textNav[i]}</p></a>`;
      ul.appendChild(li);
      const hrefFragment = RegexParser.clearSlashes(this.hrefNav[i].toString());
      if (RegexParser.getFragment() === hrefFragment) {
        li.classList.add('active');
      }
    }
    this.element.appendChild(ul);
    return this.element;
  }
}
