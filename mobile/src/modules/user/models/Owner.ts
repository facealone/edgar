export interface IOwner {
  firstName: string;
  lastName: string;
}

export class Owner implements IOwner {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
