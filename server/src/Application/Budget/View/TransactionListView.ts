import { TransactionView } from './TransactionView';

export class TransactionListView {
  constructor(
    public readonly cashInflow: number = 0,
    public readonly cashOutlay: number = 0,
    public readonly balance: number = 0,
    public readonly transactions: TransactionView[],
  ) {}
}
