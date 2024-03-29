import { Transaction } from './Transaction';

export class TransactionList {
  constructor(
    public readonly cashInflow: number = 0,
    public readonly cashOutlay: number = 0,
    public readonly budget: number = 0,
    public readonly balance: number = 0,
    public readonly transactions: Transaction[],
  ) {}
}
