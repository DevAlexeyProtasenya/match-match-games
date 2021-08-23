import { ScoreTableManger } from '../../database/scoreTableManager';
import { UserTableManger } from '../../database/userTableManger';
import { Score } from '../../entity/score';
import { User } from '../../entity/user';
import { HeaderComponent } from '../common/headerComponent';
import { Component } from '../component';
import { UserScoreComponent } from '../score/userScoreComponent';
import '../../assets/styles/score.scss';

export class LeaderBoardComponent implements Component {
  private element: HTMLElement;

  private userTableManager?: UserTableManger;

  private header?: HeaderComponent;

  constructor(private readonly rootElement: HTMLElement | null) {
    this.element = document.createElement('main');
  }

  render(userTableManager: UserTableManger): HTMLElement {
    this.userTableManager = userTableManager;
    this.header = new HeaderComponent(this.rootElement);
    this.element.id = 'main';
    this.element.classList.add('score');
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
    this.rootElement?.appendChild(this.element);
    const header = document.createElement('h2');
    this.element.appendChild(header);
    header.textContent = 'Best players:';
    const scoreTM = new ScoreTableManger();
    scoreTM.getAll().then((result) => {
      const scores = result.valueOf() as Array<Score>;
      scores.sort((el1, el2) => el2.score - el1.score);
      for (let i = 0; i < (scores.length > 10 ? 10 : scores.length); i++) {
        if (this.userTableManager) {
          this.userTableManager.getRow(scores[i].userId).then((gettingUser) => {
            const user = gettingUser.valueOf() as User;
            const userScoreComponen = new UserScoreComponent(
              user,
              scores[i].score,
            );
            userScoreComponen.render(this.element);
          });
        }
      }
    });
  }
}
