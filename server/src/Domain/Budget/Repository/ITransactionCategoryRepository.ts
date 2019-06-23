import { TransactionCategory } from '../TransactionCategory.entity';

export interface ITransactionCategoryRepository {
  findAll(): Promise<TransactionCategory[]>;
}
