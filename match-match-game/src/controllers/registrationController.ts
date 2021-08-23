import avatarSRC from '../assets/images/registration/avatar.png';
import { RegisterComponent } from '../components/common/registerComponent';
import { UserTableManger } from '../database/userTableManger';
import { User } from '../entity/user';

export class RegistrationController {
  private readonly canselButton: HTMLButtonElement;

  private readonly submitButton: HTMLButtonElement;

  private readonly registration: HTMLElement | null;

  private readonly avatar: HTMLImageElement;

  private readonly regex: Array<RegExp>;

  private userTableManager?: UserTableManger;

  constructor(
    cancel: HTMLButtonElement,
    submit: HTMLButtonElement,
    element: HTMLElement,
    avatar: HTMLImageElement,
    userTableManager: UserTableManger,
  ) {
    this.userTableManager = userTableManager;
    this.canselButton = cancel;
    this.submitButton = submit;
    this.registration = element;
    this.avatar = avatar;
    this.regex = [
      /(?!^\d+$)(^([^!@#$%^*()_+|:;"'`~<>,.\-?/=]){0,30}$)/,
      /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
    ];
    window.localStorage.setItem('cards', 'Animals');
    window.localStorage.setItem('difficulty', '4x4');
  }

  addListeners(): void {
    const tooltipTexts = [
      'Поле не может быть пустым; не может состоять из цифр; не может содержать служебные символы.',
      'email не может быть пустым; должен соответствовать стандартному правилу формированию email',
    ];

    const removeTooltip = () => {
      document.querySelectorAll('.tooltipText').forEach((element) => {
        element.parentElement?.removeChild(element);
      });
    };

    const validate = (
      input: HTMLInputElement,
      regex: RegExp,
      tooltipNumber: number,
    ): void => {
      removeTooltip();
      if (input.value && input.value.match(regex)) {
        input.classList.remove('wrong');
        input.classList.add('good');
      } else {
        input.classList.remove('good');
        input.classList.add('wrong');
        const tooltipText = document.createElement('div');
        tooltipText.classList.add('tooltipText');
        tooltipText.textContent = tooltipTexts[tooltipNumber];
        input.parentElement?.appendChild(tooltipText);
      }
    };

    const getAvatarHandler = (): void => {
      const inputFile = this.registration?.querySelectorAll('input')[3];
      inputFile?.click();
    };

    const validateHandler = (e: Event) => {
      const inputs = document.querySelectorAll('input');
      switch (e.target) {
        case inputs[0]: {
          validate(inputs[0], this.regex[0], 0);
          break;
        }
        case inputs[1]: {
          validate(inputs[1], this.regex[0], 0);
          break;
        }
        case inputs[2]: {
          validate(inputs[2], this.regex[1], 1);
          break;
        }
        default: {
          break;
        }
      }
      if (document.querySelectorAll('.good').length === 3) {
        this.submitButton.removeAttribute('disabled');
      } else {
        this.submitButton.setAttribute('disabled', 'true');
      }
    };

    const drowCanvas = (): void => {
      const canvas = document.querySelector('canvas');
      const inputFile: HTMLInputElement = document.querySelectorAll('input')[3];
      const ctx = canvas?.getContext('2d');
      const img = new Image();
      if (inputFile.files) {
        img.src = URL.createObjectURL(inputFile.files[0]);
        inputFile.value = '';
      } else {
        img.src = avatarSRC;
      }
      img.onload = () => {
        if (canvas) {
          canvas.width = this.avatar.width;
          canvas.height = this.avatar.height;
          ctx?.drawImage(img, 0, 0, this.avatar.width, this.avatar.height);
          if (this.registration) {
            const existImage = this.registration.querySelectorAll('img')[0];
            existImage.src = canvas.toDataURL();
          }
        }
      };
    };

    const removeListeners = () => {
      this.avatar?.removeEventListener('click', getAvatarHandler);
      this.registration
        ?.querySelectorAll('input:not(input[type=file])')
        .forEach((element) => {
          element.removeEventListener('input', validateHandler);
        });
      this.registration
        ?.querySelectorAll('input[type=file]')[0]
        .removeEventListener('change', drowCanvas);
    };

    const cancelHandler = (): void => {
      const parent = this.registration?.parentElement;
      if (this.registration) {
        this.registration.querySelectorAll('input').forEach((element) => {
          element.value = '';
          element.classList.remove('wrong');
          element.classList.remove('good');
          this.registration?.querySelectorAll('.tooltip').forEach((elem) => {
            elem.parentElement?.removeChild(elem);
          });
          this.avatar.src = avatarSRC;
          removeListeners();
          this.canselButton.removeEventListener('click', cancelHandler);
        });
        parent?.removeChild(this.registration);
        if (window.localStorage.getItem('avatar')) {
          const header = parent?.querySelector('header');
          const button = header?.querySelector('button');
          if (button) {
            header?.removeChild(button);
          }
          header?.appendChild(new RegisterComponent(header).render());
        }
      }
    };

    const submitHandler = (e: Event): void => {
      e.preventDefault();
      const data = document.querySelectorAll('input');
      let userAvatar: string;
      if (this.avatar.src === avatarSRC) {
        userAvatar = '';
      } else {
        userAvatar = this.avatar.src;
      }
      const user = new User(
        data[0].value,
        data[1].value,
        data[2].value,
        0,
        userAvatar,
      );
      if (this.userTableManager) {
        this.userTableManager.createRow(user).then((result) => {
          const userId = result;
          if (userId !== '') {
            window.localStorage.setItem('userID', userId.toString());
            window.localStorage.setItem('avatar', userAvatar || avatarSRC);
          }
          this.submitButton.removeEventListener('click', submitHandler);
          cancelHandler();
        });
      }
    };

    this.registration?.addEventListener('click', () => {
      removeTooltip();
    });
    this.canselButton.addEventListener('click', cancelHandler);
    this.submitButton.addEventListener('click', submitHandler);
    this.avatar?.addEventListener('click', getAvatarHandler);
    this.registration
      ?.querySelectorAll('input:not(input[type=file])')
      .forEach((element) => {
        element.addEventListener('input', validateHandler);
      });
    this.registration
      ?.querySelectorAll('input[type=file]')[0]
      .addEventListener('change', drowCanvas);
  }
}
