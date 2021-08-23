import { UserTableManger } from '../database/userTableManger';

export interface Component {
  render(
    tableManager?: UserTableManger,
    rootElement?: HTMLElement,
    element?: HTMLElement,
  ): HTMLElement;
}
