export class Voucher {
  constructor(
    public readonly username: string,
    public readonly code: string,
    public readonly role: string,
  ) {}
}
