import { Component } from '../components/component';
import { AboutComponent } from '../components/main/aboutComponent';
import { GameComponent } from '../components/main/gameComponent';
import { GameSettingsComponent } from '../components/main/gameSettingsComponent';
import { LeaderBoardComponent } from '../components/main/leaderBoardComponent';

export class RouteTable {
  private readonly routeTable = new Map();

  constructor() {
    this.routeTable.set(
      'about',
      new AboutComponent(document.querySelector('body')),
    );
    this.routeTable.set(
      'settings',
      new GameSettingsComponent(document.querySelector('body')),
    );
    this.routeTable.set(
      'score',
      new LeaderBoardComponent(document.querySelector('body')),
    );
    this.routeTable.set(
      'game',
      new GameComponent(document.querySelector('body')),
    );
  }

  public getRouteTable(key: string): Component | undefined {
    return this.routeTable.get(key);
  }
}
