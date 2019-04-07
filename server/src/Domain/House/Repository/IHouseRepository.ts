import { House } from '../House.entity';

export interface IHouseRepository {
  save(house: House): Promise<House>;
}
