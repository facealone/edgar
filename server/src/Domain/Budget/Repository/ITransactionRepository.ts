import { Transaction } from '../Transaction.entity';
import { House } from 'src/Domain/House/House.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findByHouse(house: House): Promise<Transaction[]>;
}
