import { Transaction } from '../Transaction.entity';
import { Budget } from '../Budget.entity';
import { TransactionFiltersDto } from 'src/Infrastructure/Budget/Controller/Dto/TransactionFiltersDto';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  remove(transaction: Transaction): void;
  findByBudget(
    budget: Budget,
    filters: TransactionFiltersDto,
  ): Promise<[Transaction[], any, number]>;
  findOneById(id: string): Promise<Transaction | null>;
}
