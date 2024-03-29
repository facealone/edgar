import { HouseView } from 'src/Application/House/View/HouseView';

export class AuthenticatedView {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly apiToken: string,
    public readonly currentHouse: HouseView | null,
  ) {}
}
