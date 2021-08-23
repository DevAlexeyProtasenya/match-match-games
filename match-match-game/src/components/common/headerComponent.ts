import { UserTableManger } from '../../database/userTableManger';
import { NavComponent } from './navComponent';
import { RegisterComponent } from './registerComponent';
import { RegistrationComponent } from './registrationComponent';

export class HeaderComponent {
  private element: HTMLElement;

  private readonly logo: HTMLAnchorElement;

  private nav?: NavComponent;

  private readonly regButton: HTMLButtonElement;

  private readonly registration: RegistrationComponent;

  private userTableManager?: UserTableManger;

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    this.logo = document.createElement('a');
    this.regButton = document.createElement('button');
    this.registration = new RegistrationComponent();
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.userTableManager = userTableManager;
    this.nav = new NavComponent(this.element);
    const navElem: HTMLElement | null = document.getElementById('nav');
    if (navElem === null) {
      this.fill(this.nav);
    } else {
      const parentElem = navElem?.parentNode;
      this.getIsRegisterComponent();
      parentElem?.replaceChild(this.nav.render(), navElem);
    }
    return this.element;
  }

  private fill(nav: NavComponent): void {
    this.element.id = 'header';
    this.logo.classList.add('logo');
    this.logo.href = `#${/about/}`;
    this.fillButton();
    this.element.appendChild(this.logo);
    this.element.appendChild(nav.render());
    this.getIsRegisterComponent();
    this.rootElement?.appendChild(this.element);
  }

  private fillButton(): void {
    this.regButton.textContent = 'Register new player';
    this.regButton.classList.add('header__registration-button');
    this.regButton.addEventListener('click', () => {
      if (this.userTableManager) {
        this.element.parentNode?.appendChild(
          this.registration.render(this.userTableManager),
        );
      }
    });
  }

  private getIsRegisterComponent(): void {
    const isRegisterUser = window.localStorage.getItem('avatar');
    if (isRegisterUser) {
      this.addRegister();
    } else {
      this.addNonRegister();
    }
  }

  private addNonRegister(): void {
    this.element.appendChild(this.regButton);
  }

  private addRegister(): void {
    if (this.userTableManager) {
      this.element.appendChild(new RegisterComponent(this.element).render());
    }
  }
}
