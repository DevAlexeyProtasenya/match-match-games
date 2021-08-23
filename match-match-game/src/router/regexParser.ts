export class RegexParser {
  public static clearSlashes(path: string): string {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  public static getFragment(): string {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);
    fragment = match ? match[1] : '';
    return RegexParser.clearSlashes(fragment);
  }
}
