import { House } from '../House.entity';

export interface IHouseRepository {
  save(house: House): Promise<House>;
  find(id: string): Promise<House | null>;
}
