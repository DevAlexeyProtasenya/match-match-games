import '../../assets/styles/common/registration.scss';
import avatarSRC from '../../assets/images/registration/avatar.png';
import { RegistrationController } from '../../controllers/registrationController';
import { UserTableManger } from '../../database/userTableManger';

export class RegistrationComponent {
  private element: HTMLElement;

  private form: HTMLFormElement;

  // private name: HTMLInputElement;

  // private surname: HTMLInputElement;

  // private email: HTMLInputElement;

  private textInuts: Array<HTMLInputElement> = [];

  private photo: HTMLInputElement;

  private submitButton: HTMLButtonElement;

  private cancelButton: HTMLButtonElement;

  private formWrapper: HTMLElement;

  private fieldsWrapper: HTMLElement;

  private avatar: HTMLImageElement;

  private canvas: HTMLCanvasElement;

  constructor() {
    this.element = document.createElement('div');
    this.form = document.createElement('form');
    this.formWrapper = document.createElement('div');
    this.fieldsWrapper = document.createElement('div');
    for (let i = 0; i < 3; i++) {
      this.textInuts.push(document.createElement('input'));
    }
    this.submitButton = document.createElement('button');
    this.cancelButton = document.createElement('button');
    this.photo = document.createElement('input');
    this.avatar = document.createElement('img');
    this.canvas = document.createElement('canvas');
    this.addFieldSelectors();
    this.initStartData();
    this.addFieldTypes();
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.element.appendChild(this.formWrapper);
    this.formWrapper.innerHTML = '<h2>Register new player</h2>';
    this.formWrapper.appendChild(this.form);
    this.form.appendChild(this.fieldsWrapper);
    for (let i = 0; i < 3; i++) {
      this.createInputwrapper(this.textInuts[i]);
    }
    this.fieldsWrapper.appendChild(this.photo);
    this.fieldsWrapper.appendChild(this.avatar);
    this.fieldsWrapper.appendChild(this.canvas);
    this.form.appendChild(this.submitButton);
    this.form.appendChild(this.cancelButton);
    const controller = new RegistrationController(
      this.cancelButton,
      this.submitButton,
      this.element,
      this.avatar,
      userTableManager,
    );
    controller.addListeners();
    return this.element;
  }

  createInputwrapper(input: HTMLElement): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('tooltip');
    wrapper.appendChild(input);
    this.fieldsWrapper.appendChild(wrapper);
  }

  private addFieldTypes() {
    this.textInuts[0].type = 'text';
    this.textInuts[1].type = 'text';
    this.textInuts[2].type = 'email';
    this.submitButton.type = 'submit';
    this.cancelButton.type = 'button';
    this.photo.type = 'file';
  }

  private addFieldSelectors() {
    this.formWrapper.classList.add('form-wrapper');
    this.fieldsWrapper.classList.add('fields-wrapper');
    this.element.classList.add('wrapper');
    this.textInuts[0].id = 'nameInput';
    this.textInuts[1].id = 'surnameInput';
    this.textInuts[2].id = 'emailInput';
    this.submitButton.id = 'submitButton';
    this.submitButton.id = 'cancelButton';
    this.photo.id = 'photoInput';
  }

  private initStartData() {
    this.textInuts[0].placeholder = 'Name';
    this.textInuts[1].placeholder = 'Surname';
    this.textInuts[2].placeholder = 'Email';
    this.submitButton.textContent = 'Submit';
    this.submitButton.setAttribute('disabled', 'true');
    this.cancelButton.textContent = 'Cancel';
    this.avatar.src = avatarSRC;
    this.viewCanvas();
  }

  private viewCanvas() {
    const ctx = this.canvas.getContext('2d');
    const newImage = new Image();
    newImage.src = this.avatar.src;
    newImage.onload = () => {
      this.canvas.width = this.avatar.width;
      this.canvas.height = this.avatar.height;
      ctx?.drawImage(newImage, 0, 0);
    };
  }
}
