import { House } from 'src/Domain/House/House.entity';
import { Budget } from '../Budget.entity';

export interface IBudgetRepository {
  save(budget: Budget): Promise<Budget>;
  findOneById(id: string): Promise<Budget>;
  findByHouse(house: House): Promise<any[]>;
}