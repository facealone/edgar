import { IAuthenticationUserState } from '../types/authentication';

export class LoggedUser implements IAuthenticationUserState {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly currentHouse: string,
  ) {}
}
