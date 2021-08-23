import { User } from '../../entity/user';
import avatarSRC from '../../assets/images/registration/avatar.png';

export class UserScoreComponent {
  private user: User;

  private score: number;

  constructor(user: User, score: number) {
    this.user = user;
    this.score = score;
  }

  render(rootElement: HTMLElement): HTMLElement {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    const avatar = document.createElement('img');
    const fullName = document.createElement('p');
    const email = document.createElement('p');
    const score = document.createElement('p');
    const label = document.createElement('label');
    avatar.src = this.user.avatar || avatarSRC;
    avatar.alt = 'avatar';
    fullName.textContent = `${this.user.firstName} ${this.user.lastName}`;
    fullName.classList.add('fullname');
    email.textContent = this.user.email;
    email.classList.add('email');
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('user-score');
    score.textContent = this.score.toString();
    score.classList.add('score-value');
    label.textContent = 'Score: ';
    scoreDiv.appendChild(label);
    scoreDiv.appendChild(score);
    userDiv.appendChild(avatar);
    userDiv.appendChild(fullName);
    userDiv.appendChild(email);
    userDiv.appendChild(scoreDiv);
    rootElement.appendChild(userDiv);
    return userDiv;
  }
}
