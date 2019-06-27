import { Transaction } from '../Transaction.entity';
import { Budget } from '../Budget.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  remove(transaction: Transaction): void;
  findByBudget(budget: Budget, date: Date): Promise<Transaction[]>;
  findOneById(id: string): Promise<Transaction | null>;
}
