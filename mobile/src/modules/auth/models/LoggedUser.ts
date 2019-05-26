export interface ILoggedUser {
  firstName: string;
  lastName: string;
  email: string;
  currentHouse: string;
}

export class LoggedUser implements ILoggedUser {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly currentHouse: string,
  ) {}
}
