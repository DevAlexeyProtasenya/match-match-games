import { HeaderComponent } from '../common/headerComponent';
import '../../assets/styles/game.scss';
import { TimerComponent } from '../game/timerComponent';
import { CardComponent } from '../game/cardComponent';
import animals from '../../assets/images/game/animal.json';
import nature from '../../assets/images/game/nature.json';
import { CardStateEnum } from '../game/cardStateEnum';
import { ScoreComponent } from '../game/scoreComponent';
import { UserTableManger } from '../../database/userTableManger';
import { Component } from '../component';
import { Score } from '../../entity/score';
import { ScoreTableManger } from '../../database/scoreTableManager';

export class GameComponent implements Component {
  private element: HTMLElement;

  private startButton: HTMLButtonElement;

  private timerComponent?: TimerComponent;

  private scoreComponent?: ScoreComponent;

  private difficulty: string | null;

  private cardType: string | null;

  private cards: Array<CardComponent>;

  private turnedCardElements: Array<HTMLElement>;

  private header?: HeaderComponent;

  private timeout?: NodeJS.Timeout;

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('main');
    this.startButton = this.generateStartButton();
    this.difficulty = window.localStorage.getItem('difficulty');
    this.cardType = window.localStorage.getItem('cards');
    this.cards = [];
    this.turnedCardElements = [];
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.header = new HeaderComponent(this.rootElement);
    this.element.id = 'main';
    this.element.classList.add('game');
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
    this.timerComponent = new TimerComponent();

    const amountOfUnicCards = this.getAmountOfUnicCards();
    const imagesOfCards = this.getImagesOfCard(amountOfUnicCards);
    for (let i = 0; i < amountOfUnicCards; i++) {
      const card = new CardComponent(i, imagesOfCards[i]);
      this.cards.push(card);
      this.cards.push(card.copy());
    }
    this.timerComponent.render(this.element);
    this.cardsRender(amountOfUnicCards);
    this.element.appendChild(this.startButton);
    this.rootElement?.appendChild(this.element);
    this.makeImageUnclickable();
    this.startButton.addEventListener('click', this.startGame.bind(this));
  }

  startGame(): void {
    this.replaceStartButton();
    this.shuffle();
    this.changeAllCards(CardStateEnum.opened);
    this.cardsRender();
    this.startButton.textContent = 'Stop game';
    this.startButton.addEventListener('click', this.stopGame.bind(this));
    this.timeout = setTimeout(() => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.changeAllCards(CardStateEnum.closed);
      this.startTimer();
      this.cardsRender();
      this.turnedCardElements = [];
      this.scoreComponent = new ScoreComponent();
    }, 30000);
  }

  replaceStartButton(): void {
    const oldButton = this.startButton;
    this.startButton = this.generateStartButton();
    this.makeImageUnclickable();
    this.element.replaceChild(this.startButton, oldButton);
  }

  stopGame(): void {
    this.replaceStartButton();
    this.stopTimer();
    this.startButton.textContent = 'Start new game';
    this.startButton.addEventListener('click', this.startGame.bind(this));
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  changeAllCards(state: CardStateEnum): void {
    this.cards.forEach((elem: CardComponent) => {
      elem.setState(state);
    });
  }

  startTimer(): void {
    this.timerComponent?.startTimer(this.element);
  }

  stopTimer(): void {
    this.timerComponent?.stopTimer();
  }

  generateStartButton(): HTMLButtonElement {
    let button: HTMLButtonElement;
    if (this.startButton) {
      button = this.startButton.cloneNode(true) as HTMLButtonElement;
    } else {
      button = document.createElement('button');
      button.classList.add('startGameButton');
      button.textContent = 'Start game';
    }
    return button;
  }

  getAmountOfUnicCards(): number {
    let cardAmount = 0;
    if (this.difficulty) {
      cardAmount = this.difficulty
        .split('x')
        .map((element) => parseInt(element, 10))
        .reduce((accumulator, currentValue) => accumulator * currentValue);
    }
    return cardAmount / 2;
  }

  getImagesOfCard(amount: number): Array<string> {
    let images: Array<string> = [];
    if (this.cardType) {
      switch (this.cardType) {
        case 'Animals': {
          animals.forEach((elem: string) => {
            images.push(elem);
          });
          images = images.slice(0, amount);
          break;
        }
        case 'Nature': {
          nature.forEach((elem: string) => {
            images.push(elem);
          });
          images = images.slice(0, amount);
          break;
        }
        default:
          break;
      }
    }
    return images;
  }

  cardsRender(amountOfUnicCards?: number): void {
    const newField: HTMLElement = this.generateGameField(amountOfUnicCards);
    this.cards.forEach((elem) => {
      const card = elem.render(newField);
      if (!amountOfUnicCards) {
        this.addCardListeners(card, elem, newField);
      }
    });
  }

  openCardsRender(amountOfUnicCards?: number): void {
    const newField: HTMLElement = this.generateGameField(amountOfUnicCards);
    this.cards.forEach((elem) => {
      elem.render(newField);
    });
  }

  generateGameField(amountOfUnicCards?: number): HTMLElement {
    if (!amountOfUnicCards) {
      return this.clearGameField();
    }
    return this.createGameField(amountOfUnicCards);
  }

  createGameField(amountOfUnicCards: number): HTMLElement {
    const newField = document.createElement('div');
    newField.classList.add('gameField');
    newField.classList.add(`size-${amountOfUnicCards * 2}`);
    this.element.appendChild(newField);
    return newField;
  }

  clearGameField(): HTMLElement {
    const currentField = this.element.querySelector(
      '.gameField',
    ) as HTMLElement;
    currentField.innerHTML = '';
    return currentField;
  }

  addCardListeners(
    cardElem: HTMLElement,
    cardComponent: CardComponent,
    field: HTMLElement,
  ): void {
    cardElem.addEventListener('click', () => {
      const newCard = cardComponent.turnCard(cardElem, field);
      const openedCards = this.getOpenedCards();
      this.turnedCardElements.push(newCard);
      if (openedCards.length === 2) {
        this.scoreComponent?.addCompare();
        this.updateOpenedCards(openedCards, field);
      }
    });
  }

  getOpenedCards(): Array<CardComponent> {
    return this.cards.filter(
      (elem: CardComponent) => elem.getState() === CardStateEnum.opened,
    );
  }

  updateOpenedCards(
    openedCards: Array<CardComponent>,
    field: HTMLElement,
  ): void {
    if (openedCards[0].getID() !== openedCards[1].getID()) {
      this.scoreComponent?.addWrongCompare();
      this.turnedCardElements.forEach((elem) => {
        const timeout = setTimeout(() => {
          elem.classList.add('not-found');
          clearTimeout(timeout);
        }, 300);
      });
      this.makeImageUnclickable();
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        if (this.startButton.textContent === 'Stop game') {
          this.turnCardsBack(openedCards, field);
          this.makeImageClickable();
          // this.cardsRender();
        }
      }, 1000);
    } else {
      this.saveFoundCards(openedCards, field);
      if (this.getCountOfClosedCards() === 0) {
        this.stopGame();
        this.saveScore();
        this.renderGameComplete();
      }
      // this.cardsRender();
    }
  }

  saveScore(): void {
    const userID = window.localStorage.getItem('userID');
    if (userID) {
      const scoreTM = new ScoreTableManger();
      const score = new Score(this.getResults(), parseInt(userID, 10));
      scoreTM.getRow('userId_idx', userID).then((result) => {
        if (!result) {
          scoreTM.createRow(score);
        } else {
          const newScore = result.valueOf() as Score;
          if (newScore.score < score.getScore() && newScore.id) {
            scoreTM.deleteRow(newScore.id);
            scoreTM.createRow(score);
          }
        }
      });
    }
  }

  getCountOfClosedCards(): number {
    return this.cards.filter((elem) => elem.getState() === CardStateEnum.closed)
      .length;
  }

  makeImageUnclickable(): void {
    this.element.querySelectorAll('.card').forEach((element) => {
      (element as HTMLElement).style.pointerEvents = 'none';
    });
  }

  makeImageClickable(): void {
    this.element.querySelectorAll('.card').forEach((element) => {
      if (!element.classList.contains('found')) {
        (element as HTMLElement).style.pointerEvents = 'auto';
      }
    });
  }

  turnCardsBack(turnedCards: Array<CardComponent>, field: HTMLElement): void {
    for (let i = 0; i < turnedCards.length; i++) {
      turnedCards[i].turnCard(this.turnedCardElements[i], field);
    }
    this.turnedCardElements = [];
  }

  saveFoundCards(turnedCards: Array<CardComponent>, field: HTMLElement): void {
    for (let i = 0; i < turnedCards.length; i++) {
      turnedCards[i].saveFound(this.turnedCardElements[i], field);
    }
    this.turnedCardElements = [];
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  getResults(): number {
    const time = this.timerComponent?.getTime();
    if (time) {
      this.scoreComponent?.countScore(time);
    }
    return this.scoreComponent?.getScore() || 0;
  }

  renderGameComplete(): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('form-wrapper-success');
    const p = document.createElement('p');
    p.textContent = `Congratulations! You successfully found all matches on ${this.timerComponent?.getTime()} seconds.`;
    p.textContent += ` Score: ${this.getResults()}`;
    const button = document.createElement('button');
    button.textContent = 'OK';
    button.addEventListener('click', () => {
      this.element.removeChild(wrapper);
      window.location.href = `${window.location.href.replace(
        /#.*$/,
        '',
      )}#/score`;
    });
    formWrapper.appendChild(p);
    formWrapper.appendChild(button);
    wrapper.appendChild(formWrapper);
    this.element.appendChild(wrapper);
  }
}
