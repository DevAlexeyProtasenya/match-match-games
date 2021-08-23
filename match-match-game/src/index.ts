import { DatabaseManager } from './database/databaseManager';
import { UserTableManger } from './database/userTableManger';
import { RegexParser } from './router/regexParser';
import { Router } from './router/router';

if (RegexParser.getFragment() === '') {
  window.location.href += '#/about';
}

const md: DatabaseManager = new DatabaseManager('DevAlexeyProtasenya');
const timeout = setTimeout(() => {
  clearTimeout(timeout);
  const userTableManger = new UserTableManger(md.db);
  const router = new Router(userTableManger);
  router.listen();
}, 200);
