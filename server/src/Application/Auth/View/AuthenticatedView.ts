export class AuthenticatedView {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly token: string,
    public readonly currentHouse: string | null,
  ) {}
}
