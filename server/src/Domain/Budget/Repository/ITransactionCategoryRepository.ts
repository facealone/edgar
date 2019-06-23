import { TransactionCategory } from '../TransactionCategory.entity';

export interface ITransactionCategoryRepository {
  findAll(): Promise<TransactionCategory[]>;
  findOneById(id: string): Promise<TransactionCategory>;
}
