import { OwnerView } from 'src/Application/User/View/OwnerView';
import { TransactionCategoryView } from './TransactionCategoryView';

export class TransactionView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly amount: number,
    public readonly note: string | null,
    public readonly createdAt: Date,
    public readonly category: TransactionCategoryView,
    public readonly owner: OwnerView,
  ) {}
}
