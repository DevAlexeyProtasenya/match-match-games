import { HeaderComponent } from '../common/headerComponent';
import '../../assets/styles/gameSettings.scss';
import { GameSettingsController } from '../../controllers/gameSettingsController';
import { UserTableManger } from '../../database/userTableManger';
import { Component } from '../component';

export class GameSettingsComponent implements Component {
  private element: HTMLElement;

  private header?: HeaderComponent;

  private settingName: Array<string> = ['Game cards', 'Difficulty'];

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('main');
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.header = new HeaderComponent(this.rootElement);
    this.element.id = 'main';
    this.element.classList.add('settings');
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
    const listSetting = document.createElement('ul');
    const cardOptions: Array<string> = ['Animals', 'Nature'];
    const dificultyOptions: Array<string> = ['4x4', '6x6', '8x8'];
    const options = [cardOptions, dificultyOptions];
    if (!window.localStorage.getItem('cards')) {
      window.localStorage.setItem('cards', 'Animals');
      window.localStorage.setItem('difficulty', '4x4');
    }
    const currentSettings = [
      window.localStorage.getItem('cards'),
      window.localStorage.getItem('difficulty'),
    ];
    for (let i = 0; i < 2; i++) {
      const li = document.createElement('li');
      const select = document.createElement('select');
      const label = document.createElement('label');
      label.textContent = this.settingName[i];
      li.appendChild(label);
      for (let j = 0; j < options[i].length; j++) {
        const option = document.createElement('option');
        option.value = options[i][j];
        if (option.value === currentSettings[i]) {
          option.setAttribute('selected', 'true');
        }
        option.textContent = options[i][j];
        select.appendChild(option);
      }
      li.appendChild(select);
      listSetting.appendChild(li);
    }
    const buttonApply = document.createElement('button');
    const labelApply = document.createElement('label');
    labelApply.classList.add('success');
    labelApply.textContent = 'Settings was applied!';
    buttonApply.textContent = 'Apply';
    buttonApply.setAttribute('disabled', 'true');
    this.element.appendChild(listSetting);
    this.element.appendChild(buttonApply);
    this.element.appendChild(labelApply);
    const contoller = new GameSettingsController(this.element);
    contoller.addListeners();
    this.rootElement?.appendChild(this.element);
  }
}
