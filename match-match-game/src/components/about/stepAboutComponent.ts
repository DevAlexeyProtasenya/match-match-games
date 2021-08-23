import { Component } from '../component';

export class StepAboutComponent implements Component {
  private element: HTMLElement;

  private circleElement: HTMLElement;

  private textElement: HTMLElement;

  constructor(
    readonly rootElement: HTMLElement | null,
    readonly text: string,
    readonly number: number,
  ) {
    this.element = document.createElement('div');
    this.circleElement = document.createElement('div');
    this.textElement = document.createElement('p');
  }

  render(): HTMLElement {
    this.element.classList.add('stepBlock');
    this.circleElement.classList.add('stepBlock__circle');
    this.circleElement.textContent = this.number.toString();
    this.textElement.textContent = this.text;
    this.element.appendChild(this.circleElement);
    this.element.appendChild(this.textElement);
    this.rootElement?.appendChild(this.element);
    return this.element;
  }
}
