export interface IVoucher {
  username: string;
  code: string;
  role: string;
}

export class Voucher implements IVoucher {
  constructor(
    public readonly username: string,
    public readonly code: string,
    public readonly role: string,
  ) {}
}
