import { Transaction } from '../Transaction.entity';
import { Budget } from '../Budget.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findByBudget(budget: Budget): Promise<Transaction[]>;
}
