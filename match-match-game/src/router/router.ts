import { UserTableManger } from '../database/userTableManger';
import { RegexParser } from './regexParser';
import { RouteTable } from './rotes';

export class Router {
  private currentRote!: string;

  private currentInterval?: NodeJS.Timeout;

  private userTableManager: UserTableManger;

  constructor(userTableManger: UserTableManger) {
    this.userTableManager = userTableManger;
  }

  public listen(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
    this.currentInterval = setInterval(this.interval.bind(this), 50);
  }

  public interval(): void {
    if (this.currentRote === RegexParser.getFragment()) return;
    const routeTable = new RouteTable();
    this.currentRote = RegexParser.getFragment();
    routeTable.getRouteTable(this.currentRote)?.render(this.userTableManager);
  }
}
