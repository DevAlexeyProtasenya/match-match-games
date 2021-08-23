import { HeaderComponent } from '../common/headerComponent';
import step1 from '../../assets/images/about/step-1.png';
import step2 from '../../assets/images/about/step-2.png';
import step3 from '../../assets/images/about/step-3.png';
import { Component } from '../component';
import { StepAboutComponent } from '../about/stepAboutComponent';
import '../../assets/styles/about.scss';
import { UserTableManger } from '../../database/userTableManger';

export class AboutComponent implements Component {
  private element: HTMLElement;

  private header?: HeaderComponent;

  private aboutHeader!: HTMLElement;

  private aboutSteps!: HTMLElement;

  private readonly aboutImages = [step1, step2, step3];

  private readonly stepText = [
    'Register new player in game',
    'Configure your game settings',
    'Start you new game! Remember card positions and match it before times up.',
  ];

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('main');
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.header = new HeaderComponent(this.rootElement);
    this.element.id = 'main';
    this.element.classList.add('about');
    this.header.render(userTableManager);
    const currentMain: HTMLElement | null = document.getElementById('main');
    if (currentMain === null) {
      this.fill();
    } else {
      const parentElem = currentMain?.parentNode;
      this.fill();
      parentElem?.replaceChild(this.element, currentMain);
    }
    return this.element;
  }

  private fill(): void {
    this.aboutHeader = document.createElement('h2');
    this.aboutHeader.textContent = 'How to play?';
    this.aboutSteps = document.createElement('div');
    this.aboutSteps.classList.add('steps');
    this.fillSteps();
    this.element.appendChild(this.aboutHeader);
    this.element.appendChild(this.aboutSteps);
    this.rootElement?.appendChild(this.element);
  }

  private fillSteps(): void {
    for (let i = 0; i < 3; i++) {
      const step = new StepAboutComponent(
        this.aboutSteps,
        this.stepText[i],
        i + 1,
      ).render();
      this.aboutSteps.appendChild(step);
      this.aboutSteps.innerHTML += `<img src="${
        this.aboutImages[i]
      }" alt="step ${i + 1}">`;
    }
  }
}
