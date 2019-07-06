import { TransactionView } from './TransactionView';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

export class TransactionListView {
  public readonly pageCount: number;

  constructor(
    public readonly budget: number = 0,
    public readonly expenses: number = 0,
    public readonly transactions: TransactionView[],
    public readonly totalItems: number,
  ) {
    this.pageCount = Math.ceil(this.totalItems / MAX_ITEMS_PER_PAGE);
  }
}
