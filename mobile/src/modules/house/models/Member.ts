export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export class Member implements IMember {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: string,
  ) {}
}
