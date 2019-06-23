import { Transaction } from '../Transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
}
