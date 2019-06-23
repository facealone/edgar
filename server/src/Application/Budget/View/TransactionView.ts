import { TransactionCategoryView } from './TransactionCategoryView';
import { OwnerView } from 'src/Application/User/View/OwnerView';

export class TransactionView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly amount: number,
    public readonly note: string | null,
    public readonly createdAt: Date,
    public readonly owner: OwnerView,
    public readonly category: TransactionCategoryView,
  ) {}
}
