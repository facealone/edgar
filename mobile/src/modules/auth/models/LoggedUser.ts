import { IHouse } from '../../house/models/House';

export interface ILoggedUser {
  firstName: string;
  lastName: string;
  email: string;
  currentHouse: IHouse | null;
}

export class LoggedUser implements ILoggedUser {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly currentHouse: IHouse | null,
  ) {}
}
