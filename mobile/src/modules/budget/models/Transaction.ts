import { IOwner } from '../../user/models/Owner';

export enum TransactionType {
  CASH_OUTLAY = 'cash_outlay',
  CASH_INFLOW = 'cash_inflow',
}

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly amount: number = 0,
    public readonly note: string | null,
    public readonly createdAt: Date,
    public readonly owner: IOwner,
  ) {}
}
