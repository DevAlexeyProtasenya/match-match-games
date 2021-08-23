import cardBackSRC from '../../assets/images/game/cardBack.png';
import { CardStateEnum } from './cardStateEnum';

export class CardComponent {
  private id: number;

  private image: string;

  private cardBack: string;

  private state: CardStateEnum;

  constructor(id: number, image: string) {
    this.id = id;
    this.image = image;
    this.state = CardStateEnum.closed;
    this.cardBack = cardBackSRC;
  }

  copy(): CardComponent {
    const newCard = new CardComponent(this.getID(), this.getImage());
    newCard.state = this.getState();
    return newCard;
  }

  render(rootElement: HTMLElement, element?: HTMLElement): HTMLElement {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const cardBack = document.createElement('img');
    cardBack.classList.add('face', 'front');
    cardBack.src = cardBackSRC;
    cardDiv.appendChild(cardBack);
    const card = document.createElement('img');
    card.classList.add('face', 'back');
    card.alt = 'card';
    switch (this.state) {
      case CardStateEnum.closed: {
        card.src = this.cardBack;
        break;
      }
      case CardStateEnum.opened: {
        card.src = this.image;
        break;
      }
      case CardStateEnum.found: {
        card.src = this.image;
        cardDiv.style.pointerEvents = 'none';
        break;
      }
      default:
        break;
    }
    cardDiv.style.userSelect = 'none';
    cardDiv.appendChild(card);
    cardDiv.ondragstart = () => false;
    if (!element) {
      rootElement.appendChild(cardDiv);
      if (this.state === CardStateEnum.opened) {
        cardDiv.classList.add('pushed');
        cardDiv.style.pointerEvents = 'none';
      }
    } else {
      this.turnCardElement(element, card);
      element.style.pointerEvents = 'none';
      return element;
    }
    return cardDiv;
  }

  turnCardElement(element: HTMLElement, newCard: HTMLElement): void {
    const previousCard = element.querySelectorAll('.back')[0];
    switch (this.state) {
      case CardStateEnum.opened: {
        element.replaceChild(newCard, previousCard);
        const timeout = setTimeout(() => {
          element.classList.add('pushed');
          clearTimeout(timeout);
        }, 1);
        break;
      }
      case CardStateEnum.closed: {
        element.classList.remove('pushed');
        element.classList.remove('not-found');
        const timeout = setTimeout(() => {
          element.replaceChild(newCard, previousCard);
          clearTimeout(timeout);
        }, 300);
        break;
      }
      case CardStateEnum.found: {
        const timeout = setTimeout(() => {
          element.classList.add('found');
          clearTimeout(timeout);
        }, 300);
        element.replaceChild(newCard, previousCard);
        break;
      }
      default: {
        break;
      }
    }
  }

  turnCard(element: HTMLElement, field: HTMLElement): HTMLElement {
    switch (this.state) {
      case CardStateEnum.closed: {
        this.state = CardStateEnum.opened;
        break;
      }
      case CardStateEnum.opened: {
        this.state = CardStateEnum.closed;
        break;
      }
      default: {
        break;
      }
    }
    return this.render(field, element);
  }

  saveFound(element: HTMLElement, field: HTMLElement): HTMLElement {
    this.state = CardStateEnum.found;
    return this.render(field, element);
  }

  getState(): CardStateEnum {
    return this.state;
  }

  getID(): number {
    return this.id;
  }

  getImage(): string {
    return this.image;
  }

  setState(state: CardStateEnum): void {
    this.state = state;
  }
}
