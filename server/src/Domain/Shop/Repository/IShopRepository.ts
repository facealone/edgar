import { Shop } from '../Shop.entity';
import { House } from 'src/Domain/House/House.entity';

export interface IShopRepository {
  save(shop: Shop): Promise<Shop>;
  findByHouse(house: House, page: number): Promise<[Shop[], number]>;
  findOneById(id: string): Promise<Shop | null>;
}
