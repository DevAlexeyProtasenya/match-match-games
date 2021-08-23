export class User {
  public firstName!: string;

  public lastName!: string;

  public email!: string;

  public avatar?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    score: number,
    avatar?: string,
  ) {
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
