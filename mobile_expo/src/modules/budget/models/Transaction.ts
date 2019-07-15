import { Owner } from '../../user/models/Owner';
import { TransactionCategory } from './TransactionCategory';

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
    public readonly category: TransactionCategory,
    public readonly owner: Owner,
  ) {}
}
